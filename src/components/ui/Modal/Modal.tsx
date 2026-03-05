import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const overlayVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black/10 transition-opacity duration-300 ease-in-out"
);

const modalVariants = cva(
  "relative w-[512px] max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl border border-gi-dark-ash transition-all duration-300 ease-in-out"
);

const headerVariants = cva(
  "flex items-start justify-between gap-4"
);

const footerVariants = cva(
  "flex justify-end mt-6"
);

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  isOpen: boolean;
  isClosable?: boolean;
  isCloseOnOverlayClick?: boolean;
  onClose: () => void;
  dataTestId?: string;
}

export function Modal({
  title,
  description,
  children,
  actions,
  isOpen,
  isClosable = true,
  isCloseOnOverlayClick = true,
  onClose,
  className,
  dataTestId,
  ...rest
}: ModalProps) {

  const containerRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  React.useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={overlayVariants()}
      onClick={() => {
        if (isCloseOnOverlayClick) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid={dataTestId}
        className={cn(modalVariants(), className)}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        <div className={headerVariants()}>
          <div>
            <h2 id={titleId} className="font-semibold">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>

          {isClosable && (
            <button
              type="button"
              onClick={onClose}
              className="opacity-70 hover:opacity-100 transition"
            >
              <XIcon className="size-5 " />
            </button>
          )}
        </div>

        {children && <div className="mt-4">{children}</div>}

        {actions && (
          <div className={footerVariants()}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}