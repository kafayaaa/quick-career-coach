import Link from "next/link";

interface Props {
  title: string;
  href: string;
  activePath: string;
  children: React.ReactNode;
}

export default function AnalyzeTab({
  title,
  href,
  activePath,
  children,
}: Props) {
  const isActive = activePath === href;
  return (
    <Link
      href={href}
      className={`min-w-fit flex items-center text-xs gap-2 border-b-2 pb-3 px-3 ${
        isActive ? "text-sky-500 border-sky-500" : "border-transparent"
      }`}
    >
      {children}
      <p>{title}</p>
    </Link>
  );
}
