var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path = require('path');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });
var db = require('./models/payfairModels');
passport.serializeUser(function (user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    PS: For this project, the entire user was passed
    */
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    /*
    Instead of user this function usually recives the id
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});
/*
Linkedin Passport Strategy
You must create an app on linkedin to retrieve the client id and secret
For basic users, you only have access to r_emailadress and r_liteprofile
*/
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: 'http://localhost:3000/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
}, function (accessToken, refreshToken, profile, done) {
    /*
Note: there is a column for access and refresh tokens in our postgres db but was not needed since
a higher privelage is needed (see linkedin partner program) to query additional fields
*/
    var getUserQuery = "\n    SELECT * \n    FROM users u\n    WHERE u.linkedin_user_id = $1\n  ";
    var addNewUserQuery = "\n    INSERT INTO users(linkedin_user_id, name, email, image_url)\n    VALUES($1, $2, $3, $4)\n  ";
    function executeQuery() {
        return __awaiter(this, void 0, void 0, function () {
            var user, addNewUser, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.query(getUserQuery, [profile.id])];
                    case 1:
                        user = _a.sent();
                        if (!(user.rows.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, db.query(addNewUserQuery, [
                                profile.id,
                                profile.displayName,
                                profile.emails[0].value,
                                profile.photos[0].value,
                            ])];
                    case 2:
                        addNewUser = _a.sent();
                        return [4 /*yield*/, db.query(getUserQuery, [profile.id])];
                    case 3:
                        newUser = _a.sent();
                        done(null, profile);
                        return [3 /*break*/, 5];
                    case 4:
                        done(null, profile);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    executeQuery();
}));
//# sourceMappingURL=passport-setup.js.map