const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const session = require('express-session');
const Memorystore = require('memorystore')(session);
const bcrypt = require('bcrypt');
const pp = require('./lib/passport/passport');


app.use(bodyParser.urlencoded({extended : false}));
app.use(compression());
app.use(express.static(path.join(__dirname, './public')));

session
const maxAge = 1000 * 60 * 30;
const sessionObj = {
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: maxAge,
        sameSite: 'lax',
        
}}
app.use(session(sessionObj));

//passport
let passport = pp.passport(app);
// app.post('/member/signin_confirm', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/member/signin_form',
// }));
app.post('/member/signin_confirm', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.redirect(`/member/signin_form?errMsg=${encodeURIComponent(info.message)}`);
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            console.log("User logged in:", user); // 로그인 후 사용자 정보 로그
            console.log("Session after login:", req.session); // 로그인 후 세션 로그
            setTimeout(() => {
                res.redirect('/'); // 홈으로 리디렉트
            }, 100); // 100ms 대기
        });
    })(req, res, next);
});

app.use((req, res, next) => {
    console.log("current session", req.session);
    next();
})

//view 
app.set('view engine', 'ejs');
app.set('views','./views');

//home routing
app.get('/', (req, res) => {
    console.log("/");

    res.redirect('/home');
})

//router setting
const homeRouter = require('./routes/homeRouter');
app.use('/home', homeRouter);
const memberRouter = require('./routes/memberRouter.js');
app.use('/member', memberRouter);


//server init
app.listen(3002);
