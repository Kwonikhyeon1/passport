const express = require('express');
const router = express.Router();
const memberService = require('../lib/service/memberService');

    router.get('/signup_form', (req, res) => {
        console.log("/signup_form");
        memberService.signupForm(req, res);

    })
    router.post('/signup_confirm', (req, res) => {
        console.log("/signup_confirm");
        memberService.signupConfirm(req, res);

    })
    router.get('/signin_form', (req, res) => {
        console.log("/signin_form");
        memberService.signinForm(req, res);

    })
    router.post('/signin_confirm', (req, res) => {
        console.log("/signin_confirm");
        memberService.signinConfirm(req, res);

    })
    router.get('/signout_confirm', (req, res) => {
        console.log("/signout_confirm");
        memberService.signoutConfirm(req, res);

    })
    router.get('/modify_form', (req, res) => {
        console.log("/modify_form");
        memberService.modifyForm(req, res);

    })
    router.post('/modify_confirm', (req, res) => {
        console.log("/modify_comfirm");
        memberService.modifyConfirm(req, res);

    })
    router.get('/delete_confirm', (req, res) => {
        console.log("/delete_comfirm");
        memberService.deleteConfirm(req, res);

    })

module.exports = router;