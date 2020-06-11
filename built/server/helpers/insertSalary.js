var db = require('../models/payfairModels');
var insertSalary = {};
// Inserts company or updates company information
// Returns company _id
insertSalary.insert = function (req, res, companyKey) {
    var _a = req.body, company_name = _a.company_name, job_title = _a.job_title, employee_type = _a.employee_type, years_at_company = _a.years_at_company, years_of_experience = _a.years_of_experience, base_salary = _a.base_salary, annual_bonus = _a.annual_bonus, stock_options = _a.stock_options, signing_bonus = _a.signing_bonus, full_time_status = _a.full_time_status, active = _a.active;
    if (!company_name) {
        res.status(418).json("Error inserting salary, request must contain company_name");
    }
    // if PUT request includes salary/employment info, inserts salary table entry
    if (employee_type || years_at_company || years_of_experience ||
        base_salary || annual_bonus || stock_options ||
        signing_bonus || full_time_status || active) {
        // insert new job_title into salary table
        queryString = "INSERT INTO salary (company_id, job_title, employee_type, \n                                      years_at_company, years_of_experience, base_salary,\n                                      annual_bonus, stock_options, signing_bonus, \n                                      full_time_status, active)\n                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)\n                   RETURNING _id as key";
        var params = [companyKey, job_title, employee_type, years_at_company, years_of_experience,
            base_salary, annual_bonus, stock_options, signing_bonus, full_time_status,
            active];
        return db.query(queryString, params)
            .then(function (response) { return response.rows[0].key; })
            .catch(function (err) { return console.log('Error in query for creating new salary entry: ', err); });
    }
};
module.exports = insertSalary;
//# sourceMappingURL=insertSalary.js.map