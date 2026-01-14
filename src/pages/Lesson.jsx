import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import Quiz from "../components/Quiz";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Lesson = () => {
  const { day } = useParams();
  const { user } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const dayNumber = Number(day.replace("day", ""));

  useEffect(() => {
    if (!user) return;

    const checkAccess = async () => {
      const snap = await getDoc(doc(db, "progress", user.uid));
      const lastUnlocked = snap.exists()
        ? snap.data().lastUnlockedDay
        : 1;

      setAllowed(dayNumber === lastUnlocked);
    };

    checkAccess();
  }, [user, dayNumber]);

  useEffect(() => {
    const fetchLesson = async () => {
      const snap = await getDoc(doc(db, "lessons", day));
      if (snap.exists()) setLesson(snap.data());
    };
    fetchLesson();
  }, [day]);

  if (!lesson) return <p className="p-6">Loading lesson...</p>;

  if (!allowed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow border text-center">
          <h2 className="text-xl font-semibold text-red-500">
            🔒 Lesson Locked
          </h2>
          <p className="text-slate-500 mt-2">
            Complete previous lessons to unlock this one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">

        <span className="text-blue-600 text-sm font-medium">
          Day {lesson.dayNumber}
        </span>

        <h1 className="text-2xl font-semibold text-slate-800 mt-2">
          {lesson.title}
        </h1>

        <p className="text-slate-600 mt-4 leading-relaxed">
          {lesson.content}
        </p>

        {!showQuiz && (
          <button
            onClick={() => setShowQuiz(true)}
            className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Start Quiz →
          </button>
        )}

        {showQuiz && <Quiz day={day} />}
      </div>
    </div>
    </>
  );
};

export default Lesson;
