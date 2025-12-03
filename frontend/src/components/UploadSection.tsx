"use client";

import { supabase } from "@/lib/supabaseClient";
import { MdArrowRightAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import CVUploadParser from "./CVUploadParser";

export default function UploadSection() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id || null);
    };
    getUser();
  }, []);

  return (
    <div
      id="upload-cv"
      className="w-full h-screen flex flex-col items-center justify-center gap-15 md:gap-30"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-xl md:text-2xl text-center font-bold">
          3 Step to Career Success
        </h2>
        <ol className="list-decimal text-base md:text-xl">
          <li>
            <p className="flex items-center gap-1">
              Upload CV <MdArrowRightAlt /> Get feedback
            </p>
          </li>
          <li>Practice mock interview</li>
          <li>Identify skill gaps</li>
        </ol>
      </div>
      <div className="w-2/3 md:w-full max-w-sm flex flex-col items-center gap-3">
        <CVUploadParser userId={userId || undefined} />
      </div>
    </div>
  );
}
