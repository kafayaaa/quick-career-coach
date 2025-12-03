"use client";

import CVParseSection from "@/components/CVParseSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import TableField from "@/components/TableField";
import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ParseResult() {
  const { result, setResult, analyzeResult, setAnalyzeResult } = useCV();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    headline: "",
    education: [] as string[],
    experience: [] as string[],
    hardSkills: "",
    softSkills: "",
    languages: "",
    tools: "",
    projects: [] as string[],
    achievements: [] as string[],
    certifications: [] as string[],
    links: "",
    targetRole: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const storedData = localStorage.getItem("extractedText");

      if (!storedData) {
        alert("No extracted data found.");
        router.push("/");
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(storedData);

      // update context
      setResult(parsedData);

      // update formData
      setFormData({
        name: parsedData.name || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        address: parsedData.address || "",
        bio: parsedData.bio || "",
        headline: parsedData.headline || "",
        education: parsedData.education || [],
        experience: parsedData.experience || [],
        hardSkills: parsedData.hardSkills || "",
        softSkills: parsedData.softSkills || "",
        languages: parsedData.languages || "",
        tools: parsedData.tools || "",
        projects: parsedData.projects || [],
        achievements: parsedData.achievements || [],
        certifications: parsedData.certifications || [],
        links: parsedData.links || "",
        targetRole: "",
      });

      setLoading(false);
    };

    fetchData();
  }, [router, setResult]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    field: keyof typeof formData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...(prev[field] as string[])];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);
    if (!formData) {
      alert("No data found");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/cv/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const analysis = await response.json();
      console.log("AI Analysis Result:", analysis);

      if (!response.ok) {
        alert("Failed: " + analysis.error);
        return;
      }

      if (analysis.success) {
        setAnalyzeResult(analysis.data);
        console.log(analyzeResult);
        localStorage.setItem("analysisData", JSON.stringify(analysis.data));
        console.log("ANALYSIS DATA:", analysis.data);
        alert("Analysis completed!");
        router.push("/analyze-result");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error analyzing CV:", error);
        alert("Failed to analyze CV: " + error.message);
      } else {
        console.error("Unknown error analyzing CV:", error);
        alert("Failed to analyze CV.");
      }
    }

    setLoading(false);
  };

  if (!result) return <LoadingScreen />;
  if (loading) return <LoadingScreen />;
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-10 py-20">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Your CV</h1>
        <p>Please correct your CV if there are any mistakes.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-11/12 md:max-w-xl flex flex-col items-center gap-6 md:gap-20"
      >
        <CVParseSection title="Personal Info">
          <TableField
            title="Name"
            fieldName="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TableField
            title="Email"
            fieldName="email"
            value={formData.email}
            inputType="email"
            onChange={handleChange}
          />
          <TableField
            title="Phone"
            fieldName="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TableField
            title="Address"
            fieldName="address"
            value={formData.address}
            isTextArea={true}
            onChange={handleChange}
          />
          <TableField
            title="Links"
            fieldName="links"
            value={formData.links}
            isTextArea={true}
            onChange={handleChange}
          />
          <TableField
            title="Headline"
            fieldName="headline"
            value={formData.headline}
            onChange={handleChange}
          />
          <TableField
            title="Bio"
            fieldName="bio"
            value={formData.bio}
            isTextArea={true}
            onChange={handleChange}
          />
        </CVParseSection>
        <CVParseSection title="Education">
          {formData.education.map((edu, i) => (
            <TableField
              key={i}
              title={`Education ${i + 1}`}
              fieldName={`education-${i}`}
              value={edu}
              onChange={(e) =>
                handleArrayChange("education", i, e.target.value)
              }
            />
          ))}
        </CVParseSection>

        <CVParseSection title="Skills">
          <TableField
            title="Hard Skills"
            fieldName="hardSkills"
            value={formData.hardSkills}
            onChange={handleChange}
          />
          <TableField
            title="Soft Skills"
            fieldName="softSkills"
            value={formData.softSkills}
            onChange={handleChange}
          />
          <TableField
            title="Languages"
            fieldName="languages"
            value={formData.languages}
            onChange={handleChange}
          />
          <TableField
            title="Tools"
            fieldName="tools"
            value={formData.tools}
            onChange={handleChange}
          />
        </CVParseSection>

        <CVParseSection title="Experiences">
          {formData.experience.map((exp, i) => (
            <TableField
              key={i}
              title={`Experience ${i + 1}`}
              fieldName={`experience-${i}`}
              value={exp}
              onChange={(e) =>
                handleArrayChange("experience", i, e.target.value)
              }
            />
          ))}
        </CVParseSection>

        <CVParseSection title="Projects">
          {formData.projects.map((proj, i) => (
            <TableField
              key={i}
              title={`Project ${i + 1}`}
              fieldName={`projects-${i}`}
              value={proj}
              onChange={(e) => handleArrayChange("projects", i, e.target.value)}
            />
          ))}
        </CVParseSection>

        <CVParseSection title="Achievements">
          {formData.achievements.map((ach, i) => (
            <TableField
              key={i}
              title={`Achievement ${i + 1}`}
              fieldName={`achievements-${i}`}
              value={ach}
              onChange={(e) =>
                handleArrayChange("achievements", i, e.target.value)
              }
            />
          ))}
        </CVParseSection>

        <CVParseSection title="Certifications">
          {formData.certifications.map((ach, i) => (
            <TableField
              key={i}
              title={`Certification ${i + 1}`}
              fieldName={`certifications-${i}`}
              value={ach}
              onChange={(e) =>
                handleArrayChange("certifications", i, e.target.value)
              }
            />
          ))}
        </CVParseSection>
        <div className="p-10 border border-sky-500 rounded">
          <CVParseSection title="What job do you want to apply for?">
            <TableField
              title=""
              fieldName="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
            />
          </CVParseSection>
        </div>
        <button
          type="submit"
          className="px-5 py-2 rounded bg-sky-500 cursor-pointer"
        >
          Analize
        </button>
      </form>
    </div>
  );
}
