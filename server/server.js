const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

// ======= SESSION CONFIGURATION
const sessionConfig = {
    // "sid" will be default name but should be changed for potential security reasons
    name: 'Elan', // could be any name
    secret: process.env.SECRET || 'No secrets here',
    cookie: {
        maxAge: 1000 * 60 * 60, //Sessions max length
        secure: false, // Is the cookie allowed over HTTPS only? In a real production this would be TRUE
        httpOnly: true, // cannoct access the cookie from JS using document.cookies
    },
    resave: false, // keep it false to avoid recreating expired sessions
    saveUninitialized: false, //GDPR laws against setting cookies automatically for users. This is what gets toogled when you get asked about cookies on a website and you allow it
    store: new KnexSessionStore({
        knex: require('./data/dbConfig.js'),
        tablename: 'sessions', // newly created table in DATABASE for cookies/sessions will be named "sessions"
        sidfieldname: 'sid', // creating a column name that will hold SID names
        createtable: true, // if our indicated table doesn't exist, create automatically
        clearInterval: 1000 * 60 * 10, // time interval to check for sessions and clear old/unnecessary ones
    })
}
//========  ENDS HERE   ========

const routers = require('./users/users-routers.js')


const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to Elan's Project</h1>`
    )
})

server.use('/api/users', routers)


module.exports = server

