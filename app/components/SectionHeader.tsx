interface Props {
  children: React.ReactNode;
  accent?: "orange" | "teal" | "white";
  size?: "lg" | "md";
}

export function SectionHeader({ children, accent = "orange", size = "lg" }: Props) {
  const lineColor =
    accent === "teal" ? "bg-teal-500" :
    accent === "white" ? "bg-white" :
    "bg-orange-500";

  const textColor =
    accent === "white" ? "text-white" : "text-gray-900";

  return (
    <div className="mb-6">
      <div className={`w-8 h-[3px] ${lineColor} mb-3`} />
      <h2
        className={`font-extrabold leading-none tracking-tight ${textColor} ${
          size === "lg" ? "text-[22pt]" : "text-[16pt]"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
