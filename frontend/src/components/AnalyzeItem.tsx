type Props = {
  title: string;
  children: React.ReactNode;
};

export const AnalyzeItem = ({ title, children }: Props) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
};
