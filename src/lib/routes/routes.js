export const routes = {
  // --- public / auth ---
  home: "/",
  login: "/login",
  register: "/register",
  onboarding: "/app/onboarding",

  //manage
  manage: "/app/manage",

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

  //categories
  categories: (shopId) => `/app/shop-manage/${shopId}/categories`,
  socials: (shopId) => `/app/shop-manage/${shopId}/socials`,
  contactUs: (shopId) => `/app/shop-manage/${shopId}/contactUs`,
  aboutUs: (shopId) => `/app/shop-manage/${shopId}/aboutUs`,

  //teamMembers
  team: (shopId) => `/app/shop-manage/${shopId}/team`,
  newTeamMember: (shopId) => `/app/shop-manage/${shopId}/team/new`,
};