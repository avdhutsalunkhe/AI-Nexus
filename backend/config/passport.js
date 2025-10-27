import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';

// Only setup OAuth if credentials exist
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: 'oauth-' + Math.random().toString(36),
            provider: 'google',
            providerId: profile.id
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        
        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: profile.emails[0].value,
            password: 'oauth-' + Math.random().toString(36),
            provider: 'github',
            providerId: profile.id
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
}

export default passport;
