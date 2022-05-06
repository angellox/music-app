import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import Artist from '../models/Artist.js';
import Listener from '../models/Listener.js';

const checkAuth = async (req, res, next) => {
    
    //const { rol } = req.params;
    //console.log(rol);
    const { authorization } = req.headers;
    //console.log(authorization);
    let token;
    if(authorization && authorization.startsWith('Bearer')){
        //console.log('Si hay token con Bearer');
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Storing current session in node server
            const user = await Promise.all([
                Artist.findById(decoded.id).select('-password -accountConfirm'),
                Listener.findById(decoded.id).select('-password -accountConfirm')
            ]);

            req.user = user[0] ? user[0] : user[1];
            
            return next();
    
        } catch (error) {
            const e = new Error('Token is not valid. Validate that your the person who is solicitating this request.');
            return res.status(403).json({ msg: e.message });
        }
    }
    
    if(!token) {
        const error = new Error('This authentication has failed. Contact our administrator.');
        return res.status(403).json({ msg: error.message });
    }

    next();
    
};

export default checkAuth;