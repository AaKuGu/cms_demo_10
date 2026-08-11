import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import { customSession } from "better-auth/plugins";
import { logConsole } from "@/lib/console/console";
import { createAppUser, getAppUser } from "@/crud/AppUser.crud";

// Ensure the mongoose connection is established before better-auth
// tries to use it.
await dbConnect();

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {

          logConsole("lib/auth.js : databaseHooks : user : ", user)

          await createAppUser({
            name: user.name,
            email: user.email,
            userIdFromAuthLibrary: user.id,
          });
        },
      },
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {

      logConsole("lib/auth.js :  user ", user);
      logConsole("lib/auth.js :  session ", session);

      // const clinic = await getClinic({ userId: user.id });
      const appUser = await getAppUser({ userIdFromAuthLibrary: user.id })

      logConsole("lib/auth.js : appUser : ", appUser);

      return { userFromAuthLibrary: user, appUser, session };
    }),
  ],
});