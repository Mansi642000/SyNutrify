import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard 🎉</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </header>

      {/* Dashboard Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Saved Recipes Card */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-500 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Saved Recipes</h2>
          </div>
          <p className="text-gray-400">Your bookmarked recipes will appear here.</p>
        </div>

        {/* Nutrition Overview Card */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-500 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Nutrition Overview or Calculator</h2>
          </div>
          <p className="text-gray-400">Your personalized nutrition charts and insights.</p>
        </div>

        {/* Search Recipes Card */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-500 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Search Recipes</h2>
          </div>
          <p className="text-gray-400">Recipes you want will show up here.</p>
        </div>

        {/* Add Recipes Card */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-500 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Add Recipes</h2>
          </div>
          <p className="text-gray-400">Add your own recipes.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;