var db = require('../models/payfairModels');
var upsertCompany = {};
// Inserts company or updates company information
// Returns company _id
upsertCompany.upsert = function (req, res) {
    var params = [req.body.company_name,
        req.body.company_name,
        req.body.company_city,
        req.body.industry,
        req.body.region,
        req.body.company_zipcode];
    // upsert company into company table         
    var queryString = "INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) \n                      VALUES($1, $2, $3, $4, $5, $6) \n                      ON CONFLICT (linkedin_id) \n                      DO UPDATE SET \n                        name=EXCLUDED.name\n                      RETURNING _id as key";
    return db.query(queryString, params)
        .then(function (response) { return response.rows[0].key; })
        .catch(function (err) { return console.log('Error in query for upserting company: ', err); });
};
module.exports = upsertCompany;
//# sourceMappingURL=upsertCompany.js.map