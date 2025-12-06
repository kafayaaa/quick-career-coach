import NextStepCard from "@/components/NextStepCard";
import { BiTargetLock } from "react-icons/bi";

export default function NextSteps() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full p-5 flex flex-col gap-3 text-sky-900 dark:text-sky-100 border bg-sky-50 dark:bg-zinc-700 border-sky-200 rounded-lg">
        <div className="flex items-center gap-2">
          <BiTargetLock />
          <p className="text-sm font-semibold">Recomended Next Steps</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <NextStepCard number={1} desc="Lorem ipsum dolor sit amet" />
          <NextStepCard number={2} desc="Lorem ipsum dolor sit amet" />
          <NextStepCard number={3} desc="Lorem ipsum dolor sit amet" />
        </div>
      </div>
    </div>
  );
}
