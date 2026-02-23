interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 shadow-sm bg-white p-6 ${
        hover
          ? "transition-all duration-300 hover:shadow-lg hover:border-[#2563EB]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
