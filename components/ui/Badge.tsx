interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "industry";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]",
    accent: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    outline: "bg-transparent text-[#64748B] border border-[#E2E8F0]",
    industry: "bg-[#0F172A] text-white border border-transparent",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
