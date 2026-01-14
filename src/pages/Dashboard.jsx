import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FiPlay, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  const totalLessons = 21;

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      const snap = await getDoc(doc(db, "progress", user.uid));
      if (snap.exists()) {
        setProgress(snap.data());
      } else {
        setProgress({ completedDays: [], lastUnlockedDay: 1 });
      }
    };

    fetchProgress();
  }, [user]);

  if (!progress) return <p className="p-6">Loading...</p>;

  const completed = progress.completedDays.length;
  const percent = Math.round((completed / totalLessons) * 100);
  const todayLesson = `day${progress.lastUnlockedDay}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#1E293B] font-poppins">
            Welcome back 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Learn something new today in just 5 minutes.
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Today Lesson Card */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            <span className="inline-block text-sm font-medium text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
              Today’s Lesson
            </span>

            <h2 className="text-2xl font-semibold text-[#1E293B] mt-4 font-poppins">
              Day {progress.lastUnlockedDay}
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              A short, focused lesson designed to improve your JavaScript skills
              step by step.
            </p>

            <button
              onClick={() => navigate(`/lesson/${todayLesson}`)}
              className="mt-6 inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
            >
              <FiPlay className="text-lg" />
              Start Lesson
            </button>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50">
                <FiTrendingUp className="text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] font-poppins">
                Your Progress
              </h3>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>
                {completed} of {totalLessons} lessons completed
              </span>
              <span className="font-medium text-[#1E293B]">
                {percent}%
              </span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Keep going! Consistency is the key 🚀
            </p>
          </div>
        </div>

        {/* Certificate Section */}
        {completed === totalLessons && (
          <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <FiCheckCircle className="text-green-600 text-4xl mx-auto mb-3" />
            <h3 className="text-2xl font-semibold text-green-700 font-poppins">
              Course Completed 🎉
            </h3>
            <p className="text-green-700 mt-2">
              Congratulations! You’ve completed all 21 lessons.
            </p>

            <button
              onClick={() => navigate("/certificate")}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
            >
              🎓 Download Certificate
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
