export function Topbar({ logout }) {
    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <img className="w-8 h-8" src="./logo.png" alt="MoneyHoney Logo" />
                        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                            MoneyHoney
                        </span>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={logout}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}