import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGvkqzC-n2CNFoykKRKa0MCQkoaPlYY9Q",
  authDomain: "micro-learning-151fe.firebaseapp.com",
  projectId: "micro-learning-151fe",
  storageBucket: "micro-learning-151fe.firebasestorage.app",
  messagingSenderId: "824313724960",
  appId: "1:824313724960:web:5c8bdd7b37186e1f7dfc45"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =====================
// 📘 LESSON TOPICS (21 DAYS)
// =====================
const lessonTopics = [
  "What is JavaScript?",
  "Variables in JavaScript",
  "Data Types",
  "Operators",
  "Conditional Statements",
  "Loops",
  "Functions",
  "Arrow Functions",
  "Arrays",
  "Array Methods",
  "Objects",
  "Object Methods",
  "DOM Introduction",
  "Selecting DOM Elements",
  "Events",
  "Event Listeners",
  "Functions & Scope",
  "Promises",
  "Async / Await",
  "Error Handling",
  "JavaScript Best Practices",
];

// =====================
// 🧠 QUIZ QUESTIONS
// =====================
const quizData = [
  {
    question: "JavaScript is mainly used for?",
    options: [
      "Styling websites",
      "Making websites interactive",
      "Creating databases",
      "Designing logos",
    ],
    correctAnswer: "Making websites interactive",
  },
  {
    question: "Which keyword is used to declare a variable?",
    options: ["var", "define", "set", "make"],
    correctAnswer: "var",
  },
  {
    question: "Which is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    correctAnswer: "Float",
  },
  {
    question: "Which operator is used for comparison?",
    options: ["=", "==", "+", "/"],
    correctAnswer: "==",
  },
  {
    question: "Which statement is used for decision making?",
    options: ["for", "if", "loop", "function"],
    correctAnswer: "if",
  },
  {
    question: "Which loop runs at least once?",
    options: ["for", "while", "do-while", "foreach"],
    correctAnswer: "do-while",
  },
  {
    question: "How do you define a function?",
    options: ["func()", "function()", "def()", "method()"],
    correctAnswer: "function()",
  },
  {
    question: "Arrow functions were introduced in?",
    options: ["ES5", "ES6", "ES4", "ES3"],
    correctAnswer: "ES6",
  },
  {
    question: "Which data structure stores multiple values?",
    options: ["Array", "Object", "String", "Number"],
    correctAnswer: "Array",
  },
  {
    question: "Which method adds an item to array end?",
    options: ["push()", "pop()", "shift()", "map()"],
    correctAnswer: "push()",
  },
  {
    question: "Objects store data in?",
    options: ["Indexes", "Keys & Values", "Arrays", "Strings"],
    correctAnswer: "Keys & Values",
  },
  {
    question: "How do you access object property?",
    options: ["obj.key", "obj()", "obj[]()", "obj->key"],
    correctAnswer: "obj.key",
  },
  {
    question: "DOM stands for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Digital Order Model",
      "Document Order Method",
    ],
    correctAnswer: "Document Object Model",
  },
  {
    question: "Which method selects one element?",
    options: [
      "getElementById",
      "querySelectorAll",
      "getElementsByClass",
      "selectAll",
    ],
    correctAnswer: "getElementById",
  },
  {
    question: "Events are triggered by?",
    options: ["User actions", "Server", "Database", "Browser install"],
    correctAnswer: "User actions",
  },
  {
    question: "Which is an event listener?",
    options: ["onclick", "addEventListener", "onHover", "trigger"],
    correctAnswer: "addEventListener",
  },
  {
    question: "Scope defines?",
    options: [
      "Where variable is accessible",
      "Variable value",
      "Function speed",
      "Memory size",
    ],
    correctAnswer: "Where variable is accessible",
  },
  {
    question: "Promises handle?",
    options: ["Styling", "Async operations", "Loops", "Errors only"],
    correctAnswer: "Async operations",
  },
  {
    question: "Async/await makes code?",
    options: ["Slower", "Cleaner", "Harder", "Longer"],
    correctAnswer: "Cleaner",
  },
  {
    question: "try/catch is used for?",
    options: ["Loops", "Error handling", "Functions", "Arrays"],
    correctAnswer: "Error handling",
  },
  {
    question: "Best practice in JS?",
    options: [
      "Write clean code",
      "Ignore errors",
      "Avoid functions",
      "No comments",
    ],
    correctAnswer: "Write clean code",
  },
];

// =====================
// 🚀 SEED FUNCTION
// =====================
const seedFirestore = async () => {
  try {
    for (let i = 0; i < 21; i++) {
      const dayId = `day${i + 1}`;

      await setDoc(doc(db, "lessons", dayId), {
        dayNumber: i + 1,
        title: `Day ${i + 1}: ${lessonTopics[i]}`,
        content: `In this lesson, you will learn about ${lessonTopics[i]}. This micro lesson is designed to be completed in 5 minutes.`,
      });

      await setDoc(doc(db, "quizzes", dayId), quizData[i]);
    }

    console.log("✅ 21 Days UNIQUE Lessons & Quizzes Added");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};

seedFirestore();
