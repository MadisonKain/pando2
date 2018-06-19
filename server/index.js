require("dotenv").config();
const express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    massive = require( 'massive' ),
    passport = require( 'passport' ),
    Auth0Strategy = require( 'passport-auth0' ),
    ctrl = require( './controller' ),
    cors = require( 'cors' ),
    session = require( 'express-session' );
    // S3 = require( './S3.js' );

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT,
    RES_REDIRECT
} = process.env;

const app = express();

app.use( cors() );
app.use( bodyParser.json( {limit: '50MB'} ) );
// S3( app )

massive( CONNECTION_STRING )
    .then( db => {
    app.set( 'db', db )
    console.log("===== Database == Connection == Established =====")
}).catch(err => console.log('DATABASE CONNECTION ERROR ========= >>> ', err))

app.use( session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// ===== AUTH 0 SETUP ===== //
app.use( passport.initialize() );
app.use( passport.session() );

// const strategy = new Auth0Strategy({
//     domain: DOMAIN,
//     clientID: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     callbackURL: CALLBACK_URL,
//     scope: 'openid profile'   
// }, ( accessToken, refreshToken, extraParams, profile, done) => done(null, profile) );
// passport.use( strategy );

passport.use( new Auth0Strategy({
   domain: DOMAIN,
   clientID: CLIENT_ID,
   clientSecret: CLIENT_SECRET,
   callbackURL: CALLBACK_URL,
   scope: 'openid profile'
}, function( accessToken, refreshToken, extraParams, profile, done ){
    const db = app.get( 'db' );
    db.find_user( [profile.id] ).then( userResult => {
        if( !userResult[0] ){
            db.create_user([
                profile.displayName,
                profile.picture,
                // THERE HAS TO BE SOMETHING HERE FOR THE ID TO POPULATE, FAM BUT FIND OUT WHICH ONE!
            ]).then( createdUser => {
                return done( null, createdUser[0].id )
            })
        } else {
            return done( null, userResult[0].id )
        }
    })
}))
passport.serializeUser( (id, done) => {
    done( null, id );
})
passport.deserializeUser( (id, done) => {
    app.get( 'db' ).find_session_user( [id] ).then( loggedInUser => {
        done( null, loggedInUser[0] );
    })
})

app.get( '/auth', passport.authenticate( 'auth0' ) );
app.get( '/auth/callback', passport.authenticate( 'auth0', {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
}))
app.get( '/auth/me', (req, res) => {
    if( req.user ){
        res.status( 200 ).send( req.user );
    } else {
        res.status( 401 ).send( 'You need to log in!' )
    }
})
app.get( '/auth/logout', (req, res) => {
    req.logout();
    res.redirect( RES_REDIRECT );
})

// ==================== //


app.listen( SERVER_PORT, () => console.log( `===== Searching for Rebel scum on port ${SERVER_PORT} =====` ) );