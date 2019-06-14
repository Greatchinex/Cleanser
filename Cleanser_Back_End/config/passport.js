// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const User = require("../models/userModel");
// const config = require("../config/database");

// module.exports = (passport) => {
//     let opts = {};

//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//     opts.secretOrKey = config.secret;

//     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//         // console.log(jwt_payload);
//         User.getUserById(jwt_payload.user._id, (err, user) => {
//             if(err) {
//                 return done(err, false)
//             }

//             if(user) {
//                 return done(null, user)
//             } else {
//                 return done(null, false)
//             }
//         })
//     }))
// }


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/userModel");
const config = require("../config/database");

module.exports = (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}