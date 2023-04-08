const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // This function is called when the user is authenticated with GitHub.
  // You can handle the user's profile data here and save it to your database.
}));



