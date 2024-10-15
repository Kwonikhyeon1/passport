const DB = require('../db/db');
const bcrypt = require('bcrypt');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;


exports.passport = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        console.log("serializeUser:", user);
        done(null, user.m_id);
    });

    passport.deserializeUser(function(id, done) {
        console.log("deserializeUser:", id); // ID 확인
        let sql = `SELECT * FROM TBL_MEMBER WHERE M_ID = ?`;
        DB.query(sql, [id], (error, member) => {
            if (error) {
                console.error("Database query error:", error);
                return done(error);
            }
            if (member.length > 0) {
                console.log("Member found:", member[0]); // 쿼리 결과 확인
                done(null, member[0]); // 사용자 정보 전달
            } else {
                console.log("No member found for ID:", id); // ID로 사용자 없음 확인
                done(null, false); // 사용자가 없는 경우
            }
        });
    });
    

    passport.use(new LocalStrategy(
        {
            usernameField: 'm_id', 
            passwordField: 'm_pw',
        },
        function(username, password, done) {
            console.log("username of LocalStrategy", username);
            console.log("password of LocalStrategy", password);

            let sql = `SELECT * FROM TBL_MEMBER WHERE M_ID = ? `;
            let state = [username];

            DB.query(sql, state, (error, member) => {
                if(error) { return done(error); }
                if(member.length > 0) {
                    if(bcrypt.compareSync(password, member[0].m_pw)) {
                        return done(null, member[0], {message : 'welcome'});
                       
                    } else {
                        return done(null, false, {message : 'incoreect member Password'});
                    }

                } else {
                    return done(null, false, {message : 'not exist member Info'});
                }
            }); 
        }
    ))

    return passport;

}

// module.exports = passport;