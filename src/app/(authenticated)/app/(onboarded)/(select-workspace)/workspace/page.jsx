// app/(authenticated)/workspace/page.jsx
import Link from "next/link";
import { workSpaceAccessCheck } from "@/SSRCalls/Workspace.ssrCalls";
import { getManagedClients } from "@/SSRCalls/Workspace.ssrCalls";
import { selectOwnWorkspaceAction } from "@/actions/Workspace.actions";
import { routes } from "@/lib/routes/routes";

export default async function WorkspacePage() {
    await workSpaceAccessCheck();

    const managedClients = await getManagedClients();


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-medium text-gray-900">
                        Choose a workspace
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Pick what you'd like to manage right now
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Manage your own stores */}
                    {/* <Link
                        href={routes.shops}
                        className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-150"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.75}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 9.75 12 4l9 5.75V19a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.75Z"
                                />
                            </svg>
                        </div>

                        <h2 className="mt-4 text-base font-medium text-gray-900">
                            Manage your own stores
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                            Access and manage the stores under your own business
                        </p>

                        <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 group-hover:gap-1.5 gap-1 transition-all">
                            Continue
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </span>
                    </Link> */}

                    <form action={selectOwnWorkspaceAction}>
                        <button
                            type="submit"
                            className="group relative w-full text-left bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-150"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75 12 4l9 5.75V19a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.75Z" />
                                </svg>
                            </div>

                            <h2 className="mt-4 text-base font-medium text-gray-900">
                                Manage your own stores
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                                Access and manage the stores under your own business
                            </p>

                            <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 group-hover:gap-1.5 gap-1 transition-all">
                                Continue
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </span>
                        </button>
                    </form>

                    {/* Manage other's stores */}
                    <Link
                        href={routes.workSpaceClients}
                        className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-150"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.75}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                />
                            </svg>
                        </div>

                        <h2 className="mt-4 text-base font-medium text-gray-900">
                            Manage other's stores
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                            Access stores you've been given access to manage
                        </p>

                        {managedClients?.length > 0 ? (
                            <span className="mt-4 inline-flex items-center text-sm font-medium text-violet-600 group-hover:gap-1.5 gap-1 transition-all">
                                {managedClients.length} client{managedClients.length > 1 ? "s" : ""}
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </span>
                        ) : (
                            <span className="mt-4 inline-block text-sm text-gray-400">
                                No clients assigned yet
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}