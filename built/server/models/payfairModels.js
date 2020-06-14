var Pool = require('pg').Pool;
var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../../.env') });
var PG_URI = process.env.PG_URI;
var pool = new Pool({
    connectionString: PG_URI,
});
// Schema for the database can be found below:
// https://github.com/fairpay/fairpay/...
module.exports = {
    query: function (text, params, callback) {
        return pool.query(text, params, callback);
    },
};
//# sourceMappingURL=payfairModels.js.map