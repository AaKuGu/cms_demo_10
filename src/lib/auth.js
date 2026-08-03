// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import mongoose from "mongoose";
// import { dbConnect } from "@/lib/dbConnect";
// import { getClinic } from "@/crud/Clinic.crud";
// import { serialize } from "./serialize";
// import { customSession } from "better-auth/plugins";
// import { getStaffByUserId } from "@/crud/Staff.crud";
// import { logConsole } from "@/lib/console/console";

// // Ensure the mongoose connection is established before better-auth
// // tries to use it.
// await dbConnect();

// export const auth = betterAuth({
//   database: mongodbAdapter(mongoose.connection.db),
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },
//   plugins: [
//     customSession(async ({ user, session }) => {
//       const clinic = await getClinic({ userId: user.id });

//       if (clinic) {
//         return {
//           user,
//           session,
//           clinicId: serialize(clinic)._id,
//           isOwner: true,
//         };
//       }

//       logConsole("No clinic found for user:", user.id);

//       const staff = await getStaffByUserId(user.id);

//       logConsole("Staff found for user:", staff);

//       if (staff) {
//         return {
//           user,
//           session,
//           clinicId: serialize(staff).clinicId,
//           isOwner: false,
//         };
//       }

//       return { user, session, clinicId: null, isOwner: false };
//     }),
//   ],
// });


import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import { customSession } from "better-auth/plugins";
import { logConsole } from "@/lib/console/console";
import { getAppUser } from "@/crud/AppUsers.crud";

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
  plugins: [
    customSession(async ({ user, session }) => {

      logConsole("lib/auth.js : appUser : user ", user);
      logConsole("lib/auth.js : appUser : session ", session);


      // const clinic = await getClinic({ userId: user.id });
      const appUser = await getAppUser({ userIdFromAuthLibrary: user.id })

      logConsole("lib/auth.js : appUser : ", appUser);

      if (appUser) {
        return {
          userFromAuthLibrary: user,
          appUser,
          session,
        };
      }

      logConsole("No App User found :", user.id);

      return { userFromAuthLibrary: user, appUser, session };
    }),
  ],
});