
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../model/User.model";
// Passport serializeUser & deserializeUser - BẮT BUỘC cho sessio

export function passportConfig() {
    passport.serializeUser((user: any, done:any) => {
    // Bạn nên chỉ serialize _id, tránh serialize object lớn
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done:any) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth2 Strategy Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:8000/user/auth/google/callback"
  },
  async (accessToken: any, refreshToken: any, profile: any, done:any) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
          authProvider: 'google'
        });

        console.log("New Google user created:", user);
        await user.save();
        
      } else {
        console.log("Existing user found:", user);
      }
      return done(null, user);
    } catch (error) {
      console.error("Google Strategy error:", error);
      return done(error, null);
    }
  }
));
}