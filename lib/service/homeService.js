const homeService = {
    home: (req, res) => {
        res.render('home/home', {loginedMemberID : req.user
        
        });
    }
};

module.exports = homeService;