import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";

const Certificate = () => {
  const { user } = useAuth();
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const checkProgress = async () => {
      const snap = await getDoc(doc(db, "progress", user.uid));
      if (snap.exists()) {
        const completed = snap.data().completedDays?.length || 0;
        setEligible(completed === 21);
      }
      setLoading(false);
    };

    checkProgress();
  }, [user]);

  const downloadPDF = () => {
    const pdf = new jsPDF("landscape", "pt", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    // Border
    pdf.setDrawColor(37, 99, 235);
    pdf.setLineWidth(6);
    pdf.rect(20, 20, width - 40, height - 40);

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(40);
    pdf.setTextColor(37, 99, 235);
    pdf.text("Certificate of Completion", width / 2, 120, {
      align: "center",
    });

    // Subtitle
    pdf.setFontSize(16);
    pdf.setTextColor(100);
    pdf.text("This certificate is proudly presented to", width / 2, 180, {
      align: "center",
    });

    // Name
    pdf.setFontSize(32);
    pdf.setTextColor(30);
    pdf.text(user.email, width / 2, 240, {
      align: "center",
    });

    // Course
    pdf.setFontSize(18);
    pdf.setTextColor(100);
    pdf.text("for successfully completing the", width / 2, 290, {
      align: "center",
    });

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);
    pdf.setTextColor(37, 99, 235);
    pdf.text(
      "21-Day JavaScript Micro Learning Program",
      width / 2,
      330,
      { align: "center" }
    );

    // Footer
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.setTextColor(120);
    pdf.text(
      `Awarded on ${new Date().toDateString()}`,
      80,
      height - 100
    );

    pdf.text(
      "Micro Learning Platform",
      width - 80,
      height - 100,
      { align: "right" }
    );

    pdf.save("Micro-Learning-Certificate.pdf");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading certificate...
      </div>
    );
  }

  if (!eligible) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-500">
            Certificate Locked ❌
          </h2>
          <p className="text-gray-600 mt-3 text-sm">
            Complete all 21 lessons to unlock your certificate.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl text-center">
        <h1 className="text-2xl font-bold text-slate-800">
          🎓 Certificate Ready
        </h1>
        <p className="text-gray-600 mt-3 text-sm">
          Congratulations! You’ve completed the 21-Day course.
        </p>

        <button
          onClick={downloadPDF}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition"
        >
          Download Certificate 📄
        </button>
      </div>
    </div>
  );
};

export default Certificate;
