import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const overlayVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black/10 transition-opacity duration-300 ease-in-out",
);

const modalVariants = cva(
  "relative w-[512px] max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl border border-gi-dark-ash transition-all duration-300 ease-in-out",
);

const headerVariants = cva("flex items-start justify-between gap-4");
const footerVariants = cva("flex justify-end mt-6");

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
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors),
      ).filter((el) => !el.hasAttribute("disabled"));

    const focusableElements = getFocusable();

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      container.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const elements = getFocusable();
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
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
        tabIndex={-1}
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
              aria-label="Close dialog"
              className="opacity-70 hover:opacity-100 transition"
            >
              <XIcon className="size-5" />
            </button>
          )}
        </div>

        {children && <div className="mt-4">{children}</div>}

        {actions && <div className={footerVariants()}>{actions}</div>}
      </div>
    </div>
  );
}