export function Login({handleSubmit,email,password,setEmail,setPassword,setIsSignUp}){
    return (
            <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-24 h-20" src="./logo.png" alt="logo" />
                    </a>
                    <div className="text-2xl font-bold text-white mb-7">MoneyHoney</div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log In
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••" required />
                                </div>
                                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Log In
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account yet? <a onClick={() => setIsSignUp(true)} className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Sign Up here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    )
}