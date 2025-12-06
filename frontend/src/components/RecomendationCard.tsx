import { BiTargetLock } from "react-icons/bi";
import { FaRegLightbulb, FaRegStar } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
interface Props {
  priority: string;
  title: string;
  children: React.ReactNode;
}

export default function RecomendationCard({
  priority,
  title,
  children,
}: Props) {
  return (
    <div
      className={`w-full p-5 flex flex-col gap-2 rounded-lg border
                ${
                  priority === "low"
                    ? "bg-emerald-50 dark:bg-zinc-700 border-emerald-200 text-emerald-900 dark:text-emerald-100"
                    : priority === "medium"
                    ? "bg-amber-50 dark:bg-zinc-700 border-amber-200 text-amber-900 dark:text-amber-100"
                    : priority === "high"
                    ? "bg-rose-50 dark:bg-zinc-700 border-rose-200 text-rose-900 dark:text-rose-100"
                    : priority === "tips"
                    ? "bg-sky-50 dark:bg-zinc-700 border-sky-200 text-sky-900 dark:text-sky-100"
                    : ""
                }
              `}
    >
      <div className="flex items-center gap-2">
        {priority === "low" ? (
          <FaRegLightbulb />
        ) : priority === "medium" ? (
          <SlBadge />
        ) : priority === "high" ? (
          <BiTargetLock />
        ) : priority === "tips" ? (
          <FaRegStar />
        ) : null}
        <p className="font-semibold text-sm">{title}</p>
      </div>
      <ul className="text-xs list-disc list-inside">{children}</ul>
    </div>
  );
}
