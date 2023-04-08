const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // save user to database or return existing user
      return done(null, profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // redirect to home page or return JWT token
    res.redirect('/');
  }
);
