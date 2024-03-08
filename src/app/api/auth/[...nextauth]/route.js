import { connectdb } from "@/helper/db";
import { User } from "@/models/users";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      //authorize is used to validate the user credentials entered
      async authorize(credentials, req) {
        await connectdb();
        try {
          const matchedUser = await User.findOne({
            email: credentials.email,
          });
          if (!matchedUser) {
            return null;
          }
          if (matchedUser.provider !== "credentials") {
            throw new Error(`Already registered at ${matchedUser.provider}`);
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            matchedUser?.password
          );

          if (!isPasswordCorrect) {
            return null;
          }

          const userToken = jwt.sign(
            {
              _id: credentials._id,
              email: credentials.email,
            },
            process.env.JWT_KEY
          );
          return matchedUser;
        } catch (error) {
          console.log("Error from authorize function from credentials", error);
          throw new Error(error);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, profile, account }) {
      if (user) {
        // passing id and dates to the token to get this in the sessinion
        return {
          ...token,
          id: user._id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          mobileno: user.mobileno,
        };
      }
      if (account?.provider !== "credentials") {
        const existingUser = await User.findOne({ email: token.email });

        return {
          ...token,
          id: existingUser._id,
          createdAt: existingUser.createdAt,
          updatedAt: existingUser.updatedAt,
          provider: existingUser.provider,
          mobileno: existingUser.mobileno,
        };
      }
      return token;
    },
    async session({ session, token, user, account }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
          provider: token.provider,
          mobileno: token.mobileno,
        },
      };
      // }
    },
    async signIn({ user, account, profile, email, credentials }) {
      //Bug - If we use the same email id for the user credentials and the github login we need to give the error msg

      if (account.provider === "credentials") {
        return true;
      }
      if (account.provider === "github") {
        await connectdb();

        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              provider: account.provider, //This is used to distinguish between if the user uses the same email id for the github login and credentials logins
            });
            await newUser.save();
            return true;
          }
          if (existingUser.provider !== "github") {
            return false;
          }

          return true;
        } catch (error) {
          console.log("Error from github route", error);
          return false;
        }
      }

      if (account.provider === "google") {
        await connectdb();

        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              provider: account.provider, //This is used to distinguish between if the user uses the same email id for the github login and credentials logins
            });
            await newUser.save();
            return true;
          }
          if (existingUser.provider !== "google") {
            return false;
          }

          return true;
        } catch (error) {
          console.log("Error from github route", error);
          return false;
        }
        return true;
      }

      return true;
    },
  },
});

// export const handler = () => {
//   return NextAuth(authOptions());
// };
export { handler as GET, handler as POST };
