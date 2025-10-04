import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "w-full px-5 xl:px-7.5 mx-auto max-w-[1216px] ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
