import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const AnimatedButton = ({
    children,
    onClick,
    disabled = false,
    className,
}: AnimatedButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative overflow-hidden transition-all duration-300",
                "hover:scale-105 active:scale-95",
                "animate-pulse cursor-pointer",
                className
            )}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </button>
    );
};
