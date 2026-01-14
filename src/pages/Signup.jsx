import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

const Signup = () => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
  };

  const handleGoogleSignup = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-inter px-4">
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="font-poppins text-3xl text-[#1E293B] mb-2">
          Create Account 🚀
        </h2>
        <p className="text-gray-500 mb-6">
          Start your 21-day learning journey
        </p>

        <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 mb-4 focus-within:border-[#2563EB]">
          <FaEnvelope className="text-gray-400" />
          <input
            className="w-full outline-none text-sm"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 mb-6 focus-within:border-[#2563EB]">
          <FaLock className="text-gray-400" />
          <input
            type="password"
            className="w-full outline-none text-sm"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-[#2563EB] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          Create Account
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <FaGoogle className="text-red-500" />
          Sign up with Google
        </button>

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <a href="/" className="text-[#2563EB] font-medium cursor-pointer">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
