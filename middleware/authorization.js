const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader) {
        return res.status(401).json('token is required');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_Secret_Key);
        req.currentUser = decodedToken;
        next();
    }catch(error) {
        return res.status(401).json('invalid token');
    }
}

exports.isTeacher = (req,res,next) => {
    if(req.currentUser.role != 'teacher') {
        return res.status(401).json('you are unauthorized');
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if(req.currentUser.role != 'admin') {
        return res.status(401).json('you are unauthorized');
    }
    next();
}