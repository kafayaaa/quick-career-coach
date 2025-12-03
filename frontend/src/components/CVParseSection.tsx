type Props = {
  title: string;
  children: React.ReactNode;
};

export default function CVParseSection({ title, children }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-xl text-center font-bold mb-3">{title}</h2>
      <div className="w-full flex flex-col gap-10">{children}</div>
    </div>
  );
}
