"use client";

import { useState } from "react";

interface InterviewQuestion {
  type: "behavioral" | "technical" | "situational";
  question: string;
}

interface QuestionData {
  questions: InterviewQuestion[];
}

interface EvaluationResponse {
  overallScore: number;
  criteria: Record<string, number>;
  strengths: string[];
  improvements: string[];
  improvedAnswer: string;
}

export default function Question() {
  // Load questions from localStorage once
  const [data] = useState<QuestionData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("questionData");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("JSON error:", e);
      return null;
    }
  });

  // store user answers
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResponse | null>(null);

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async () => {
    if (!data) return;

    setLoading(true);
    setResult(null);

    const payload = data.questions.map((q, index) => ({
      question: q.question,
      type: q.type,
      answer: answers[index] || "",
    }));

    try {
      const res = await fetch("http://localhost:5000/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissions: payload }),
      });

      const evaluation = await res.json();

      if (!evaluation || typeof evaluation !== "object") {
        console.error("Invalid evaluation:", evaluation);
        return;
      }

      if (!evaluation.criteria) {
        console.error("Missing criteria in evaluation:", evaluation);
        return;
      }

      setResult(evaluation);
    } catch (err) {
      console.error("Failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-10 py-10 md:py-20 px-6">
      <h1 className="text-2xl md:text-4xl font-bold">Interview Questions</h1>

      {!data && <p>Loading questions...</p>}

      {data?.questions?.map((item, index) => (
        <div
          key={index}
          className="w-full max-w-3xl p-6 bg-zinc-800 text-zinc-50 rounded-xl shadow-lg"
        >
          <p className="font-semibold mb-2 capitalize">{item.type} Question:</p>
          <p className="mb-4">{item.question}</p>

          <textarea
            className="w-full min-h-32 p-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none"
            placeholder="Tulis jawaban kamu di sini..."
            value={answers[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-600"
      >
        {loading ? "Evaluating..." : "Submit All Answers"}
      </button>

      {/* Show Evaluation */}
      {result && (
        <div className="w-full max-w-3xl mt-10 p-6 bg-zinc-800 text-zinc-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Evaluation Result</h2>

          <p className="mb-2">
            <strong>Overall Score:</strong> {result.overallScore} / 100
          </p>

          <div className="mb-4">
            <strong>Score per Criteria:</strong>
            <ul className="list-disc ml-6 mt-2">
              {Object.entries(result.criteria).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}%
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong>Strengths:</strong>
            <ul className="list-disc ml-6 mt-2">
              {result.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong>Areas to Improve:</strong>
            <ul className="list-disc ml-6 mt-2">
              {result.improvements.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong>Improved Answer:</strong>
            <p className="mt-2 whitespace-pre-line">{result.improvedAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
