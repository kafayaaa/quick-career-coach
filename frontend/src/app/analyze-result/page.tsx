"use client";

import { AnalyzeItem } from "@/components/AnalyzeItem";
import { AnalyzeScore } from "@/components/AnalyzeScore";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AnalyzeResult() {
  const { analyzeResult, setAnalyzeResult, loading, setLoading } = useCV();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedData = localStorage.getItem("analysisData");
      if (!storedData) {
        alert("No data found");
        router.push("/");
        setLoading(false);
        return;
      }
      const parsedData = JSON.parse(storedData);
      setAnalyzeResult(parsedData);
      setLoading(false);
    };
    fetchData();
  }, [router, setAnalyzeResult, setLoading]);

  const handleDownload = async () => {
    if (!analyzeResult) return alert("No analysis result");

    const response = await fetch("http://localhost:5000/api/cv/download-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(analyzeResult),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv-analysis.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (!analyzeResult) return <LoadingScreen />;
  if (loading) return <LoadingScreen />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-10 py-10 md:py-20">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Your CV Analyze</h1>
        <p>Here is your CV analyze result by AI</p>
      </div>
      <div className="w-full max-w-10/12 md:max-w-4xl pb-10 flex flex-col justify-center items-center gap-8 border-b border-sky-500/50">
        <AnalyzeItem title="Missing Sections">
          <ul className="w-full">
            {analyzeResult.missingSections.map((section, index) => (
              <li key={index} className="list-disc">
                {section}
              </li>
            ))}
          </ul>
        </AnalyzeItem>
        <AnalyzeItem title="Scores">
          <ul className="w-full flex flex-col gap-3">
            <AnalyzeScore
              title="Structure Format"
              score={analyzeResult.scores.structureFormat.score}
              desc={analyzeResult.scores.structureFormat.justification}
            />
            <AnalyzeScore
              title="Content Quality"
              score={analyzeResult.scores.contentQuality.score}
              desc={analyzeResult.scores.contentQuality.justification}
            />
            <AnalyzeScore
              title="Skill Keywords"
              score={analyzeResult.scores.skillsKeywords.score}
              desc={analyzeResult.scores.skillsKeywords.justification}
            />
            <AnalyzeScore
              title="ATS Optimization"
              score={analyzeResult.scores.atsOptimization.score}
              desc={analyzeResult.scores.atsOptimization.justification}
            />
            <AnalyzeScore
              title="Total Score"
              score={analyzeResult.scores.totalScore.score}
              desc={analyzeResult.scores.totalScore.justification}
            />
          </ul>
        </AnalyzeItem>
        <AnalyzeItem title="Suggestions">
          <ul className="flex flex-col gap-5">
            {analyzeResult.suggestions.map((suggestion, index) => (
              <li key={index} className="list-disc">
                <div className="w-full flex flex-col gap-2 text-justify">
                  <p>Priority: {suggestion.priority}</p>
                  <p>Issue: {suggestion.issue}</p>
                  <p>Suggestion: {suggestion.suggestion}</p>
                  <p>Example: {suggestion.example}</p>
                </div>
              </li>
            ))}
          </ul>
        </AnalyzeItem>
        <AnalyzeItem title="Summary">
          <ul className="w-full flex flex-col gap-2">
            {analyzeResult.summary.map((summary, index) => (
              <li key={index} className="list-disc">
                {summary}
              </li>
            ))}
          </ul>
        </AnalyzeItem>
        <button
          onClick={handleDownload}
          className="px-5 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700"
        >
          Download PDF
        </button>
      </div>
      <div className="flex flex-col items-center gap-5">
        <p>Ready to take the next step?</p>
        <button
          onClick={() => router.push("/interview")}
          className="px-5 py-3 flex items-center bg-sky-600 text-white rounded-md hover:bg-sky-700"
        >
          Practice Mock Interview
          <FaArrowRightLong className="ml-3" />
        </button>
      </div>
    </div>
  );
}
