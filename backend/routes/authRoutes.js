import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.redirect(`http://localhost:5173/oauth-success?token=${token}&name=${req.user.name}&email=${req.user.email}`);
  }
);

// GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.redirect(`http://localhost:5173/oauth-success?token=${token}&name=${req.user.name}&email=${req.user.email}`);
  }
);

export default router;
