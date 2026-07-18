import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import { getClinic } from "@/crud/Clinic.crud";
import { serialize } from "./serialize";
import { customSession } from "better-auth/plugins";

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
      const clinic = await getClinic({ userId: user.id });
      const clinicId = clinic ? serialize(clinic)._id : null;
 
      return { user, session, clinicId };
    }),
  ],
});