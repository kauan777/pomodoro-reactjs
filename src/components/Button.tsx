import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  description: string;
}

function Button({ description, icon, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="animate-[wiggle_.2s_ease-in-out] text-gray-50 border border-gray-500 flex items-center justify-center gap-1 bg-gray-500 w-32 py-2 rounded-full dark:text-gray-500 dark:bg-gray-50 hover:bg-gray-600 transition-colors dark:hover:bg-slate-100"
    >
      <>
        {icon}
        {description}
      </>
    </button>
  );
}

export default Button;
