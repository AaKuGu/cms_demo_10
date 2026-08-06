// import { redirect } from "next/navigation";
// import { getAuthenticatedContext } from "../authentication/authentication";
// import { logConsole } from "@/lib/console/console";

// export async function afterOnboardingRoutesGuard() {
//   const context = await getAuthenticatedContext();

//   if (!context.userId) {
//     redirect("/login");
//   }

//   if (!context.clinicId) {
//     redirect("/onboarding"); // hasn't completed clinic setup yet
//   }

//   return context; // { userId, clinicId, isOwner }
// }

// export async function beforeOnboardingRoutesGuard() {
//   const context = await getAuthenticatedContext();
//   logConsole("before on boarding routes guard : ", context);

//   if (!context.userId) {
//     redirect("/login");
//   }

//   if (context.clinicId) {
//     redirect("/dashboard"); // Clinic is already setup for this
//   }


//   return context; // { userId, clinicId, isOwner }
// }

// src/lib/routes.js

export const routes = {
  // --- public / auth ---
  home: "/",
  login: "/login",
  register: "/register",
  onboarding: "/onboarding",
  shops: "/app/shops",
  shopEdit: (shopId) => `/app/shops/${shopId}/edit`,
  shopView: (shopId) => `/app/shops/${shopId}`,
  shopCreate: `/app/shops/new`,
  storePreview: (shopId) => `/app/shop-manage/${shopId}/storePreview`,
  live: (shopId) => `/app/shop-manage/${shopId}/live`,

  //products
  products: (shopId) => `/app/shop-manage/${shopId}/products`,
  productView: (shopId, productId) => `/app/shop-manage/${shopId}/products/${productId}`,
  productEdit: (shopId, productId) => `/app/shop-manage/${shopId}/products/${productId}/edit`,
  newProduct: (shopId) => `/app/shop-manage/${shopId}/products/new`,
  categories: (shopId) => `/app/shop-manage/${shopId}/categories`,
  socials: (shopId) => `/app/shop-manage/${shopId}/socials`,
  contactUs: (shopId) => `/app/shop-manage/${shopId}/contactUs`,
  aboutUs: (shopId) => `/app/shop-manage/${shopId}/aboutUs`,
};