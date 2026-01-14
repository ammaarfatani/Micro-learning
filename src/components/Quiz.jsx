import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PASS_PERCENT = 70;

const Quiz = ({ day }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [passed, setPassed] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const dayNumber = Number(day.replace("day", ""));

  // 🔹 Fetch quiz + progress
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Quiz
      const quizSnap = await getDoc(doc(db, "quizzes", day));
      if (quizSnap.exists()) {
        setQuiz(quizSnap.data());
      }

      // Progress
      const progressSnap = await getDoc(doc(db, "progress", user.uid));
      if (progressSnap.exists()) {
        const progress = progressSnap.data();
        if (progress.completedDays?.includes(dayNumber)) {
          setAlreadyCompleted(true);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [day, user, dayNumber]);

  // 🔥 Submit handler
  const handleSubmit = async () => {
    if (!quiz || !user || alreadyCompleted) return;

    const correct = selected === quiz.correctAnswer;
    const score = correct ? 100 : 0;
    const pass = score >= PASS_PERCENT;

    setIsCorrect(correct);
    setPassed(pass);
    setSubmitted(true);

    if (!pass) return;

    await setDoc(
      doc(db, "progress", user.uid),
      {
        completedDays: arrayUnion(dayNumber),
        scores: {
          [`day${dayNumber}`]: score,
        },
        lastUnlockedDay: dayNumber + 1,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  if (loading) {
    return <p className="mt-6 text-gray-500">Loading quiz...</p>;
  }

  // 🛑 ALREADY COMPLETED UI
  if (alreadyCompleted) {
    return (
      <div className="mt-8 bg-green-50 border border-green-300 p-6 rounded-xl">
        <h3 className="text-green-700 font-poppins text-lg">
          ✅ Quiz Completed
        </h3>
        <p className="text-gray-600 mt-2">
          You have already completed this quiz successfully.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-[#2563EB] text-white px-6 py-2 rounded-lg"
        >
          Go to Dashboard →
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-[#F8FAFC] p-6 rounded-xl">
      <h3 className="font-poppins text-lg text-[#1E293B] mb-4">
        {quiz.question}
      </h3>

      <div className="space-y-3">
        {quiz.options.map((opt, index) => {
          const isSelected = selected === opt;
          const isAnswer = opt === quiz.correctAnswer;

          let style = "border-gray-200";
          if (submitted) {
            if (isAnswer) style = "border-green-500 bg-green-50";
            else if (isSelected) style = "border-red-500 bg-red-50";
          } else if (isSelected) {
            style = "border-blue-500 bg-blue-50";
          }

          return (
            <label
              key={index}
              className={`block border p-3 rounded-lg cursor-pointer transition ${style}`}
            >
              <input
                type="radio"
                name="answer"
                disabled={submitted}
                className="mr-2"
                onChange={() => setSelected(opt)}
              />
              {opt}
            </label>
          );
        })}
      </div>

      {!submitted ? (
        <button
          disabled={!selected}
          onClick={handleSubmit}
          className="mt-6 bg-[#2563EB] text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-6">
          {passed ? (
            <>
              <p className="text-green-600 font-medium">
                🎉 You passed! Next lesson unlocked.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-4 bg-[#2563EB] text-white px-6 py-2 rounded-lg"
              >
                Go to Dashboard →
              </button>
            </>
          ) : (
            <>
              <p className="text-red-600 font-medium">
                ❌ You failed. Please try again.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelected("");
                }}
                className="mt-4 bg-[#1E293B] text-white px-4 py-2 rounded-lg"
              >
                Retry Quiz
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
