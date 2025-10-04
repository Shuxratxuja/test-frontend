import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    disabled?: boolean;
    error?: boolean;
}

export const CustomCheckbox = ({
    checked,
    onChange,
    className,
    disabled = false,
    error = false
}: CustomCheckboxProps) => {
    return (
        <div className={cn("relative", className)}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="sr-only"
            />
            <div
                className={cn(
                    "w-[32px] h-[32px] rounded border-2 cursor-pointer transition-all duration-200",
                    "flex items-center justify-center",
                    checked
                        ? ""
                        : "bg-transparent border-gray-400",
                    error && "border-red-500 animate-pulse-red",
                    disabled && "opacity-50 cursor-not-allowed",
                    "hover:border-gray-300"
                )}
                onClick={() => !disabled && onChange(!checked)}
            >
                {checked && (
                    <svg
                        className="w-5 h-5 text-mainColor"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};
