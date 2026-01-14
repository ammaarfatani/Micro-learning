import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer"
        >
          <h1 className="font-poppins text-xl text-[#2563EB] font-semibold">
            Micro<span className="text-[#1E293B]">Learning</span>
          </h1>
        </div>

        {/* Right Side */}
        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-gray-600">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 text-[#1E293B] hover:bg-red-50 hover:text-red-600 transition"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
