"use client";

import { Question } from "@/types/question";
import { createContext, useContext, useState } from "react";

interface InterviewContextType {
  question: Question[] | [];
  setQuestion: (data: Question[] | []) => void;
  role: string;
  setRole: (data: string) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(
  undefined
);

export const InterviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [question, setQuestion] = useState<Question[] | []>([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <InterviewContext.Provider
      value={{
        question,
        setQuestion,
        role,
        setRole,
        loading,
        setLoading,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within a InterviewProvider");
  }
  return context;
};
