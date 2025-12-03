type Props = {
  title: string;
  value: string;
  fieldName: string;
  inputType?: string;
  isTextArea?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function TableField({
  title,
  value,
  fieldName,
  inputType = "text",
  isTextArea = false,
  onChange,
}: Props) {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={fieldName} className="ml-2 font-bold">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          name={fieldName}
          id={fieldName}
          className="w-full px-2 py-1 border-b  border-zinc-50/25 focus:border-zinc-50 focus:outline-none resize-y"
          spellCheck={false}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          name={fieldName}
          id={fieldName}
          type={inputType}
          value={value}
          className="w-full px-2 py-1 border-b border-zinc-50/25 focus:border-zinc-50 focus:outline-none"
          onChange={onChange}
        />
      )}
    </div>
  );
}
