import { twMerge } from "tailwind-merge";
import { BUTTON_TEST_ID } from "./Button.constants";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        className,
        "p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer",
      )}
      data-testid={BUTTON_TEST_ID}
    >
      {children}
    </button>
  );
};

export default Button;
