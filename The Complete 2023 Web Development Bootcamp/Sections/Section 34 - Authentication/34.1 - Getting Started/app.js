import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import bcrypt from 'bcryptjs';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { db, connectDB } from './dbConfig.js'; 
import User from './User.js';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();
const app = express();
const port = 3000;
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(flash());

app.use(session({
    secret: process.env.secret,
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

// Helper functions
const findUserByusername = async (username) => {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0]; // Return the first user found
};

const comparePassword = async (userPassword, hash) => {
    return await bcrypt.compare(userPassword, hash);
};

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await findUserByusername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // Use environment variables for security
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Serialize the user for the session
passport.serializeUser((user, done) => {
    // Use user.username since it's the primary key in your database table
    done(null, user.username);
});

// Deserialize the user
passport.deserializeUser(async (username, done) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        done(null, user); // user is the deserialized user object from the database
    } catch (err) {
        done(err, null);
    }
});

// app.get('/flash', function(req, res){
//     // Set a flash message by passing the key, followed by the value, to req.flash().
//     req.flash('info', 'Flash is back!')
//     res.redirect('/');
//   });

app.get("/", (req, res) => {
    // Check for flash messages and pass them to the template
    const errorMessages = req.flash('error');
    if (errorMessages.length > 0){
        console.log(errorMessages);
        res.render("home", { error: errorMessages });
    } else {
        res.render("home");
    }
});


app.get("/login", (req, res) => {
    res.render("login");
});

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/secrets',
//     failureRedirect: '/login',
//     failureFlash: true // optional, requires flash middleware
// }));

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Set a flash message for the authentication error
            req.flash('error', 'Authentication error: ' + err.message);
            return res.render('login', { error: req.flash('error') });
        }
        if (!user) {
            req.flash('error', info.message);
            return res.render('login', { error: req.flash('error') });
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                // Set a flash message for the login error
                req.flash('error', 'Login error: ' + loginErr.message);
                return res.render('login', { error: req.flash('error') });
            }
            return res.redirect('/secrets');
        });
    })(req, res, next);
});


app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, hashedPassword]);
        // req.login({ username: req.body.username, password: hashedPassword }, err => {
        //     if (err) {
        //         console.error(err);
        //         req.flash('error', 'Failed to automatically log in. Please log in manually.');
        //         return res.redirect('/login');
        //     }
        //     return res.redirect('/secrets');
        // });
        if (user) {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            })
        }
    } catch (error) {
        console.error(error);
        const errorMessage = "Email already in use";
        req.flash('error', errorMessage);
        return res.render('register', { error: req.flash('error') });
    }
});


app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        req.flash('error', "User is not authenticated");
        res.render('login', { error: req.flash('error') });
    }
});

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            req.flash('error', 'Logout failed: ' + err.message);
            // Redirect to the homepage with the flash message
            return res.redirect('/');
            // return next(err); // Handle error if necessary
        }
        
        res.redirect('/'); // Redirect to homepage or login page after logout
    });
});


app.get('/trigger-error', (req, res) => {
    try {
        // Deliberately cause an error
        const result = JSON.parse('This is not a valid JSON string!');
        res.send(result); // This line won't be executed due to the error above
    } catch (error) {
        // Set a flash message for the error
        req.flash('error', 'A deliberate error occurred: ' + error.message);
        // Redirect to the homepage
        res.redirect('/');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
