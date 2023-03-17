require('dotenv').config();

module.exports.isAuth = (req, res, next) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        next();
    } else {
       res.status(401).json({ msg: 'Login' });
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.userID==process.env.ADMIN1||req.user.userID==process.env.ADMIN2)) {
        next();
    } else {
       res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}

module.exports.isCOAdmin = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.userID==process.env.COADMIN1||req.user.userID==process.env.COADMIN2||req.user.userID==process.env.COADMIN3||req.user.userID==process.env.COADMIN4||req.user.userID==process.env.COADMIN5)) {
        next();
    } else {
       res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an co admin.' });
    }
}