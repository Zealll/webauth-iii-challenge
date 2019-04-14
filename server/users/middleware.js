
const bcrypt = require('bcryptjs')
const db = require('./users-helpers.js')
const jsonWT = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

// ========== CHECKING FOR WEB TOKEN ============
function restricted(req, res, next) {
    const token = req.headers.authorization

    if(token) {
        jsonWT.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            
            if(err) {
                res.status(401).json({message: 'Get a better Token'})
            } else {
                req.decodedJWT = decodedToken
                console.log('Decoded Token', req.decodedJWT)
                next()
            }
        })
    } else {
        res.status(401).json({message: "You need a web token to get an access"})
    }
}


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jsonWT.sign(payload, secrets.jwtSecret, options)
}













// ========= CHECKING FOR SESSION/COOKIES ==========

// function restricted(req, res, next) {
//     if(req.session && req.session.user) {
//         next()
//     } else  {
//         res.status(401).json({message: "You shall not pass!"})
//     }
// }


// ======== CHECKING FOR "USERNAME amd PASSWORD"=========
// ======== OLD MIDDLEWARE =========


// function restricted(req, res, next) {
//     const { username, password } = req.headers

//     if (username && password) {
//         db 
//         .findBy({ username })
//         .first()
//         .then(user => {
//             if (user && bcrypt.compareSync(password, user.password)){
//                 next()
//             } else {
//                 res.status(401).json({message: "Invalid Username and/or Password"})
//             }
//         })
//         .catch(error => res.status(500).json(error))
//     } else {
//         res.json({message: "Forgot one of the credentials"})
//     }
// }


module.exports = {
    restricted,
    generateToken
}