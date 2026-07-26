
// import { getAuthenticatedContext } from "../authentication/authentication";
// import { checkAuthorization } from "../authorization/authorization";
// import { throwError } from "../throwError";

// export async function afterOnboardingServicesGuard(requiredPermission) {
//   const context = await getAuthenticatedContext();
  
//   if (!context.userId || !context.clinicId) {
//     throwError("Not authenticated or clinic not set up.");
//   }

//   const { allowed, reason } = checkAuthorization(context, requiredPermission);

//   if (!allowed) {
//     throwError(reason, "FORBIDDEN");
//   }

//   return context; // { userId, clinicId, isOwner }
// }



import { getUserIdFromSession } from "../authentication/authentication";
import { throwError } from "../throwError";

export async function afterOnboardingServicesGuard(requiredPermission) {
  try {
    
  } catch (error) {
    
  }
  const userId = await getUserIdFromSession();
  if(!userId) {
    throwError("Not authenticated or clinic not set up.");
  }
  
}
