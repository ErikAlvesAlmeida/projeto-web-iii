function auth(req, res, next){
    if(req.session.vendedor){
        next();
    } else{
        res.redirect("/vendedor/login");
    }
}

module.exports = auth;