import Link from 'next/link'

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
                {/* Manage your Store */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Manage your Store
                    </h2>
                    <p className="text-gray-500 mb-6">
                        View and manage the details of your own store.
                    </p>
                    <Link
                        href="/app/shops"
                        className="mt-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go to My Store
                    </Link>
                </div>

                {/* Manage other's Store */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Manage other's Store
                    </h2>
                    <p className="text-gray-500 mb-6">
                        View and manage stores belonging to other users.
                    </p>
                    <Link
                        href="/app/manage/stores"
                        className="mt-auto px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        Go to Manage Stores
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page