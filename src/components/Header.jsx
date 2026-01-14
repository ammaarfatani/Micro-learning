import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
     setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <>
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer"
        >
          <h1 className="font-poppins text-xl text-[#2563EB] font-semibold">
            Micro<span className="text-[#1E293B]">Learning</span>
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-gray-600">
              {user.email}
            </span>

            <button
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 text-[#1E293B] hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
              onClick={() => setShowLogoutConfirm(true)}
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
     {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              Confirm Logout
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded border cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
