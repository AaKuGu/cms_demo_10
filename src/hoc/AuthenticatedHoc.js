import { getAuthenticatedContext } from "@/services/AuthenticatedHoc.services";

export function AuthenticatedHoc(PageComponent) {
  return async function WrappedPage(props) {
    const { userId, clinicId } = await getAuthenticatedContext();
    return <PageComponent {...props} userId={userId} clinicId={clinicId} />;
  };
}