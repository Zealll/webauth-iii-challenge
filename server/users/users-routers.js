const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const { restricted, generateToken } = require('./middleware.js')

const db = require('./users-helpers.js')




// Endpoint for all the users if logged in
router.get('/', restricted,(req, res) => {
    db
    .get()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error))
})

//Endpoint for LOGOUT
router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(500).json({message: "You shall no Leaveeee!!!!"})
            } else {
                res.send('See you soon!')
            }
        })
    } else {
        res.status(401).json({message: "Please make sure your session is working."})
    }
})

//endpoint for REGISTERING
router.post('/register', (req,res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash

    db
    .insert(user)
    .then(saved => res.status(201).json(saved))
    .catch(error => res.status(500).json(error))
})

//endpoint for LOGIN
router.post('/login',  (req,res) => {
    let { username, password } = req.body

    db
    .findBy({ username })
    .first()
    .then(user => {
        req.session.user = user
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)

            res.status(200).json({message: `Logged In! Your ID is ${user.id}`, token})
        } else {
            res.status(401).json({message: "You shall not pass!"})
        }
    })
    .catch(error => res.status(500).json(error))
})








module.exports = router