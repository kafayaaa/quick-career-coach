"use client";

import { AnalyzeItem } from "@/components/AnalyzeItem";
import { AnalyzeScore } from "@/components/AnalyzeScore";
import AnalyzeTab from "@/components/AnalyzeTab";
import { LoadingScreen } from "@/components/LoadingScreen";
import Notif from "@/components/Notif";
import OverviewCard from "@/components/OverviewCard";
import { Progress } from "@/components/ui/progress";
import { useCV } from "@/context/CVContext";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BiTargetLock } from "react-icons/bi";
import {
  FaArrowRightLong,
  FaChartColumn,
  FaRegCircleCheck,
  FaRegLightbulb,
} from "react-icons/fa6";
import { IoMdDocument } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { RiErrorWarningLine } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { VscError } from "react-icons/vsc";

export default function AnalyzeResult({
  children,
}: {
  children: React.ReactNode;
}) {
  const { analyzeResult, setAnalyzeResult, setLoading } = useCV();
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    {
      title: "Overview",
      href: "/analyze-result/overview",
      icon: <FaChartColumn />,
    },
    {
      title: "Detailed Result",
      href: "/analyze-result/detailed-result",
      icon: <LuClipboardList />,
    },
    {
      title: "Recomendations",
      href: "/analyze-result/recomendations",
      icon: <FaRegLightbulb />,
    },
    {
      title: "Next Steps",
      href: "/analyze-result/next-steps",
      icon: <BiTargetLock />,
    },
  ];

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

  return (
    <>
      {/* <div className="w-full min-h-screen flex flex-col items-center justify-start gap-10 py-10 md:py-20 mt-15">
        <div className="text-center">
          <h1 className="text-lg   md:text-2xl font-bold mb-2">
            Your CV Analyze
          </h1>
          <p className="text-sm md:text-base">
            Here is your CV analyze result by AI
          </p>
        </div>
        <div className="w-full max-w-10/12 md:max-w-4xl pb-10 flex flex-col justify-center items-center gap-8 border-b border-sky-500/50">
          <AnalyzeItem
            title="Missing Sections"
            classProps="bg-rose-200"
            classTitle="text-rose-900"
          >
            <ul className="w-full list-disc list-inside text-sm md:text-base">
              {analyzeResult.missingSections.map((section, index) => (
                <li key={index} className="">
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
      </div> */}

      <div className="w-full max-w-11/12 md:max-w-4xl min-h-screen pt-40 mx-auto flex flex-col items-center justify-start gap-10">
        <div className="w-full p-5 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-30 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-md">
          <div className="w-full flex flex-col items-center md:items-start gap-5">
            <div className="flex flex-col items-center md:items-start gap-2">
              <h1 className="font-bold text-xl">CV Analysis Result</h1>
              <div className="flex items-center gap-1">
                <IoMdDocument className="text-lg" />
                <h2 className="text-sm">Nama Document</h2>
              </div>
            </div>
            <div className="w-full flex justify-between md:justify-start items-center md:gap-20 text-xs md:text-sm">
              <Notif count={5} title="Pass">
                <FaRegCircleCheck className="text-lg text-emerald-500" />
              </Notif>
              <Notif count={5} title="Warnings">
                <RiErrorWarningLine className="text-xl text-amber-500" />
              </Notif>
              <Notif count={5} title="Issues">
                <VscError className="text-lg text-rose-500" />
              </Notif>
            </div>
          </div>
          <div className="w-1/2 md:w-50 flex flex-col items-center gap-2 ">
            <div className="w-2/3">
              <CircularProgressbar
                value={38}
                text={`${38}`}
                styles={buildStyles({
                  pathColor: "red",
                  textColor: "red",
                  trailColor: "#e6e6e6",
                })}
              />
            </div>
            <p className="text-sm font-light">Overall Score</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center p-5 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-md overflow-clip md:overflow-hidden">
          <div className="w-full flex items-end gap-5 md:gap-10 border-b border-zinc-200 dark:border-zinc-700 overflow-scroll md:overflow-hidden">
            {tabs.map((tab) => (
              <AnalyzeTab key={tab.href} activePath={pathname} {...tab}>
                {tab.icon}
              </AnalyzeTab>
            ))}
          </div>
          <div className="w-full pt-5">{children}</div>
        </div>
      </div>
    </>
  );
}
