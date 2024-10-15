const DB = require('../db/db');
const bcrypt = require('bcrypt');

const memberService = {
    signupForm: (req, res) => {
        res.render('member/sign_up_form', { loginedMemberID: req.user });
    },
    
    signupConfirm: (req, res) => {
        let post = req.body;
        let sql = `
            INSERT INTO TBL_MEMBER(M_ID, M_PW, M_MAIL, M_PHONE) VALUES(?, ?, ?, ?)
        `;
        let state = [post.m_id, bcrypt.hashSync(post.m_pw, 10), post.m_mail, post.m_phone];
        DB.query(sql, state, (error, result) => {
            if (error) {
                console.error('Signup error:', error);
                return res.render('member/sign_up_ng', { errMsg: "회원가입에 실패했습니다. 다시 시도해주세요." });
            }
            res.render('member/sign_up_ok');
        });
    },

    signinForm: (req, res) => {
        res.render('member/sign_in_form', {
            errMsg: req.query.errMsg,
            loginedMemberID: req.user,
        });
    },

    // signinConfirm: (req, res) => {
    //     console.log('signinConfirm()');
    //     let post = req.body;
    //     let sql = `SELECT * FROM TBL_MEMBER WHERE M_ID = ?`;
    //     let state = [post.m_id];
    //     DB.query(sql, state, (error, member) => {
    //         if (error) {
    //             console.error('Signin error:', error);
    //             return res.render('member/sign_in_ng', { errMsg: "로그인 처리 중 오류가 발생했습니다." });
    //         }

    //         if (member.length > 0) {
    //             if (bcrypt.compareSync(post.m_pw, member[0].M_PW)) {
    //                 req.logIn(member[0], (err) => {
    //                     if (err) {
    //                         console.error('Login error:', err);
    //                         return res.render('member/sign_in_ng', { errMsg: "로그인 실패. 다시 시도해주세요." });
    //                     }
    //                     return res.render('member/sign_in_ok', { loginedMemberID: req.user });
    //                 });
    //             } else {
    //                 res.render('member/sign_in_ng', { errMsg: "비밀번호가 일치하지 않습니다." });
    //             }
    //         } else {
    //             res.render('member/sign_in_ng', { errMsg: "등록되지 않은 사용자입니다." });
    //         }
    //     });
    // },

    signoutConfirm: (req, res) => {
            req.session.destroy();
            res.redirect('/member/signin_form'); // 로그아웃 후 홈으로 리다이렉트
    },

    modifyForm: (req, res) => {
        let sql = `SELECT * FROM TBL_MEMBER WHERE M_NO = ?`;
        let state = [req.user.m_no]; // 사용자의 M_NO를 가져옵니다.
        
        DB.query(sql, state, (error, member) => {
            if (error) {
                console.log("error", error);
                return res.status(500).send("Internal Server Error");
            } else if (member.length === 0) {
                return res.status(404).send("Member not found");
            } else {
                
                res.render('member/modify_form', { memberData: member[0], loginedMemberID: req.user });
            }
        });
    },

    modifyConfirm: (req, res) => {
        let sql = `update tbl_member set m_mail = ?, m_phone = ? where m_no =?`
        let state = [req.body.m_mail, req.body.m_phone, req.body.m_no];
        
        DB.query(sql, state, (error, result) => {
            if(error) {
                console.log("error", error);
                return res.state(500).send("Internal Server Error");
            } else {
                res.redirect('/');
            }
        })
    },

    deleteConfirm: (req, res) => {
        const m_no = req.session.m_no;
        let sql = `delete from tbl_member where m_no =?`;
        let state = [m_no];
        console.log('state----------', state);
        DB.query(sql, state, (error, result) => {
            if(error) {
                console.log("error", error);
                return res.status(500).send('Internal Server Error');
            } else {
                console.log("result--------", result);
                console.log("Delete Account Success!");
                req.session.destroy();
                res.redirect("/");
            }
        })
    },
};

module.exports = memberService;
