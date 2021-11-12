const passport = require("passport")
const FbStrategy = require("passport-facebook").Strategy

const { User } = require("../schemas")

const AuthenticateMethods = {
  JWT: "JWT",
  FACEBOOK: "FACEBOOK",
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  TWITTER: "TWITTER",
  LINKEDIN: "LINKEDIN",
}

const { SYSTEM_URL, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env

passport.serializeUser((user, done) => {
  console.log("Success")
  done(null, user)
})

passport.deserializeUser((user, done) => {
  console.log("Error")
  done(null, user)
})

passport.use(
  new FbStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: `${SYSTEM_URL}/auth/facebook/secrets`,
    },
    function (accessToken, refreshToken, profile, done) {
      const { id, displayName } = profile
      User.findOrCreate(
        {
          fbId: id,
          username: displayName,
          authMethod: AuthenticateMethods.FACEBOOK,
        },
        function (err, user) {
          if (err) return done(err)
          return done(null, user)
        }
      )
    }
  )
)

//Facebook Strategy
const loginPassportFb = passport.authenticate("facebook", {
  failureRedirect: "/auth/facebook/failed",
})

module.exports = {
  AuthenticateMethods,
  passport,
  loginPassportFb,
}
