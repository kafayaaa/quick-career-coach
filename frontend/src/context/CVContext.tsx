"use client";
import { AnalyzeResult } from "@/types/analyzeResult";
import { CVResult } from "@/types/cv";
import { createContext, useContext, useState } from "react";

interface CVContextType {
  result: CVResult | null;
  setResult: (data: CVResult | null) => void;
  analyzeResult: AnalyzeResult | null;
  setAnalyzeResult: (data: AnalyzeResult | null) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider = ({ children }: { children: React.ReactNode }) => {
  const [result, setResult] = useState<CVResult | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  return (
    <CVContext.Provider
      value={{
        result,
        setResult,
        analyzeResult,
        setAnalyzeResult,
        loading,
        setLoading,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
