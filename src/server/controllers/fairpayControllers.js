const db = require('../models/payfairModels');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const getCommonJobTitles = require('../helpers/getCommonJobTitles');
const upsertCompany = require('../helpers/upsertCompany');
const insertSalary = require('../helpers/insertSalary');

const fairpayController = {};

// GET /api/user: responds with all user data
fairpayController.getUser = (req, res, next) => {
  let currentUserId;
  if (!req.body.linkedin_user_id) {
    currentUserId = req.user.id;
  } else {
    currentUserId = req.body.linkedin_user_id;
  }
  let queryString = `SELECT *, c.linkedin_id AS company_linkedin_id, c.name AS company_name, c.city AS company_city, c.zipcode AS company_zipcode
                    FROM public.users AS u
                    LEFT OUTER JOIN public.company AS c
                    ON u.company_id = c._id
                    LEFT OUTER JOIN public.salary AS s
                    ON u.salary = s._id
                    WHERE u.linkedin_user_id = $1;`;

  let params = [currentUserId];

  db.query(queryString, params, (err, response) => {
    if (err) {
      console.log('Error in query for user: ', err);
    }

    console.log('response in getUser', response.rows);
    res.locals.userData = response.rows;

    next();
  });
};

// POST /api/company/jobTitles
fairpayController.getCommonJobTitles = async (req, res, next) => {
  res.locals.commonJobTitles = await getCommonJobTitles.get(req);
  next();
};

// POST /api/user
fairpayController.onboardUser = async (req, res, next) => {
  console.log('city in onboarduser controller', req.body.city);
  //if (!req.body.linkedin_user_id || !req.body.name || !req.body.company_name || !req.body.job_title || !req.body.company_linkedin_id) {
  console.log('COOKIES ', req.cookies);
  let userIdCookie = jwt.verify(
    req.cookies.jsonToken,
    process.env.LINKEDIN_SECRET
  );
  if (!userIdCookie) {
    res
      .status(418)
      .json(`Invalid create user request: must include linkedin_user_id`);
  }

  let companyKey = await upsertCompany.upsert(req, res);

  let salaryKey = await insertSalary.insert(req, res, companyKey);

  // then insert user into user table, including name, company foreign key and salary foreign key
  console.log('onboardUser req.body: ');
  console.log(req.body);
  let { userId, sexuality, age, gender, race, city, state } = req.body;
  queryString = `UPDATE users 
                SET company_id=$1, salary=$2, sexuality=$3,
                    age=$4, gender=$5, race=$6,
                    city=$7, state=$8
                WHERE linkedin_user_id=$9
                RETURNING *`;

  let params = [
    companyKey,
    salaryKey,
    sexuality,
    age,
    gender,
    race,
    city,
    state,
    userIdCookie,
  ];

  db.query(queryString, params)
    .then((response) => {
      res.locals.userData = response.rows[0];
      next();
    })
    .catch((err) =>
      console.log('Error in query for creating new user entry:\n', err)
    );
};

// get /api/company/:linkedin_user_id retrieves current user data to be used in subsequent middleware that will retrieve company data
// FREDO: added 'u.city' column in SELECT to store city property in res.locals.currentUser
fairpayController.getCurrentUser = (req, res, next) => {
  console.log('get current user middleware');
  const { linkedin_user_id } = req.params;
  let queryString = `select u.name, u.city, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus from salary s inner join company c on s.company_id = c._id inner join users u on s._id = u.salary where u.linkedin_user_id = '${linkedin_user_id}'`;
  db.query(queryString, (err, response) => {
    console.log('get current user middleware, DB response:');
    console.log(response.rows[0]);
    if (err) {
      return next({
        log: `fairpayController.getCurrentUser: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getCurrentUser: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.currentUser = response.rows[0];
    // console.log('res.locals.currentUser is', res.locals.currentUser);
    return next();
  });
};

// second middleware to fire after get to /api/company/:linkedin_user_id; sends company data of users with all same job titles at same company of user

fairpayController.getCompanyData = (req, res, next) => {
  const { job_title, linkedin_id } = res.locals.currentUser;
  // console.log(
  //   'inside getcompanydata, res.locals.currentUser is',
  //   res.locals.currentUser
  // );
  const params = [job_title, linkedin_id];
  //console.log("params is", params);
  let queryString = `select u.name, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus from salary s inner join company c on s.job_title = $1 and c.linkedin_id = $2 and s.company_id = c._id inner join users u on s._id = u.salary`;
  db.query(queryString, params, (err, response) => {
    // console.log('inside get company, rows is ', response.rows);
    console.log('get company data middleware DB');
    if (err) {
      return next({
        log: `fairpayController.getCompanyData: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getCompanyData: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.companyData = response;
    return next();
  });
};

// middleware gets avg stats of current user's job title in company
fairpayController.getJobStats = (req, res, next) => {
  const { linkedin_id, job_title } = res.locals.currentUser;
  const queryString = `SELECT s.job_title, 
              round(avg(s.base_salary), 0) as avg_salary, 
              round(avg(s.annual_bonus), 0) as avg_bonus, 
              round(avg(s.stock_options), 0) as avg_stock_options, 
              count(*) 
      FROM salary s 
      LEFT JOIN users u ON s._id = u.salary 
      LEFT JOIN company c ON c._id = s.company_id 
      WHERE c.linkedin_id = '${linkedin_id}' 
        AND s.active = 'true' 
        AND s.job_title = '${job_title}' 
      GROUP BY s.job_title ORDER BY s.job_title`;
  db.query(queryString, (err, response) => {
    console.log('get job stats middleware DB query');
    console.log(response.rows);
    if (err) {
      return next({
        log: `fairpayController.getJobStats: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getJobStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.jobStats = response.rows;
    //console.log('response.rows in getracestats', response.rows);
    return next();
  });
};

// middleware gets avg race stats of current user's company
fairpayController.getRaceStats = (req, res, next) => {
  const { linkedin_id, job_title } = res.locals.currentUser;
  const queryString = `select u.race, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options, count(*) from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = '${linkedin_id}' and s.active = 'true' and s.job_title = '${job_title}' group by u.race order by u.race`;
  db.query(queryString, (err, response) => {
    console.log('get race stats middleware DB query');
    if (err) {
      return next({
        log: `fairpayController.getRaceStats: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getRaceStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.raceStats = response.rows;
    //console.log('response.rows in getracestats', response.rows);
    return next();
  });
};

// middleware gets avg age stats of current user's company
fairpayController.getAgeStats = (req, res, next) => {
  const { linkedin_id, job_title } = res.locals.currentUser;
  const queryString = `select u.age, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options, count(*) from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = '${linkedin_id}' and s.active = 'true' and s.job_title = '${job_title}' group by u.age order by u.age`;
  db.query(queryString, (err, response) => {
    console.log('get age stats middleware DB query');
    if (err) {
      return next({
        log: `fairpayController.getAgeStats: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getAgeStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.ageStats = response.rows;
    //console.log('response.rows in getagestats', response.rows);
    return next();
  });
};

// middleware gets avg gender stats of current user's company
fairpayController.getGenderStats = (req, res, next) => {
  const { linkedin_id, job_title } = res.locals.currentUser;
  const queryString = `SELECT u.gender, 
            round(avg(s.base_salary), 0) as avg_salary, 
            round(avg(s.annual_bonus), 0) as avg_bonus, 
            round(avg(s.stock_options), 0) as avg_stock_options, 
            count(*) from salary s 
    LEFT JOIN users u on s._id = u.salary 
    LEFT JOIN company c on c._id = s.company_id 
    WHERE c.linkedin_id = '${linkedin_id}' 
      AND s.job_title = '${job_title}' 
      AND s.active = 'true'
    GROUP BY u.gender ORDER BY u.gender`;
  db.query(queryString, (err, response) => {
    console.log('get gender stats middleware DB query');
    if (err) {
      return next({
        log: `fairpayController.getGenderStats: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getGenderStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.genderStats = response.rows;
    //console.log('response.rows in getgenderstats', response.rows);
    return next();
  });
};

//TO-DO:
// fairpayController.getGenderStatsByCity
fairpayController.getGenderStatsByCity = (req, res, next) => {
  const { job_title, city } = res.locals.currentUser;
  const queryString = `SELECT u.gender,
            round(avg(s.base_salary), 0) AS avg_salary, 
            round(avg(s.annual_bonus), 0) AS avg_bonus, 
            round(avg(s.stock_options), 0) AS avg_stock_options, 
            count(*) 
    FROM salary s 
    LEFT JOIN users u ON s._id = u.salary 
    WHERE s.job_title = '${job_title}' 
      AND s.active = 'true'
      AND u.city = '${city}' 
    GROUP BY u.gender ORDER BY u.gender`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getGenderStatsByCity: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getGenderStatsByCity: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.genderStatsByCity = response.rows;
    //console.log('response.rows in getgenderstats', response.rows);
    return next();
  });
};

// fairpayController.getAgeStatsByCity
fairpayController.getAgeStatsByCity = (req, res, next) => {
  const { job_title, city } = res.locals.currentUser;
  const queryString = `SELECT u.age,
            round(avg(s.base_salary), 0) AS avg_salary, 
            round(avg(s.annual_bonus), 0) AS avg_bonus, 
            round(avg(s.stock_options), 0) AS avg_stock_options, 
            count(*) 
    FROM salary s 
    LEFT JOIN users u ON s._id = u.salary 
    WHERE s.job_title = '${job_title}' 
      AND s.active = 'true'
      AND u.city = '${city}' 
    GROUP BY u.age ORDER BY u.age`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getAgeStatsByCity: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getAgeStatsByCity: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.ageStatsByCity = response.rows;
    //console.log('response.rows in getgenderstats', response.rows);
    return next();
  });
};

// fairpayController.getRaceStatsByCity
fairpayController.getRaceStatsByCity = (req, res, next) => {
  const { job_title, city } = res.locals.currentUser;
  const queryString = `SELECT u.race,
            round(avg(s.base_salary), 0) AS avg_salary, 
            round(avg(s.annual_bonus), 0) AS avg_bonus, 
            round(avg(s.stock_options), 0) AS avg_stock_options, 
            count(*) 
    FROM salary s 
    LEFT JOIN users u ON s._id = u.salary 
    WHERE s.job_title = '${job_title}' 
      AND s.active = 'true'
      AND u.city = '${city}' 
    GROUP BY u.race ORDER BY u.race`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getRaceStatsByCity: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getRaceStatsByCity: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.raceStatsByCity = response.rows;
    //console.log('response.rows in getgenderstats', response.rows);
    return next();
  });
};

// fairpayController.getJobStatsByCity <-- aggregate data
fairpayController.getJobStatsByCity = (req, res, next) => {
  const { job_title, city } = res.locals.currentUser;
  const queryString = `SELECT s.job_title, 
              round(avg(s.base_salary), 0) as avg_salary, 
              round(avg(s.annual_bonus), 0) as avg_bonus, 
              round(avg(s.stock_options), 0) as avg_stock_options, 
              count(*) 
      FROM salary s 
      LEFT JOIN users u ON s._id = u.salary 
      WHERE s.active = 'true' 
        AND s.job_title = '${job_title}'
        AND u.city = '${city}' 
      GROUP BY s.job_title ORDER BY s.job_title`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getJobStatsByCity: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getJobStatsByCity: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.jobStatsByCity = response.rows;
    return next();
  });
};
module.exports = fairpayController;
