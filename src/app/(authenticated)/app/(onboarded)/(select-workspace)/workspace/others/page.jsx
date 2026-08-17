import { selectManagedClientAction } from "@/actions/Workspace.actions";
import { getManagedClients } from "@/SSRCalls/Workspace.ssrCalls";

export default async function ManagedClientsPage() {
    const { data: clients, error } = await getManagedClients();

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="w-full max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-medium text-gray-900">
                        Select a client
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Choose which client's stores you'd like to manage
                    </p>
                </div>

                {clients?.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                        <p className="text-sm text-gray-500">
                            You haven't been added to any client's team yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {clients?.map((client) => (
                            <form key={client._id} action={selectManagedClientAction.bind(null, client._id)}>
                                <button
                                    type="submit"
                                    className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-150 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {client.businessName || client.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {client.email}
                                        </p>
                                    </div>
                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </form>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}