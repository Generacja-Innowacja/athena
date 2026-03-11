import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/Button/Button.tsx";

const overlayVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black/10 transition-opacity duration-300 ease",
  {
    variants: {
      state: {
        open: "opacity-100",
        closed: "opacity-0",
      },
    },
  },
);

const modalVariants = cva(
  "relative w-[512px] max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl border border-gi-dark-ash transition-all duration-300 ease",
  {
    variants: {
      state: {
        open: "opacity-100 scale-100",
        closed: "opacity-0 scale-95",
      },
    },
  },
);

const headerVariants = cva("flex items-start justify-between text-gi-primary");

const footerVariants = cva("flex justify-end gap-3 mt-6");

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;

  actions?: boolean;
  actionVariant?: ButtonVariant;

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
  actions = false,
  actionVariant = "default",
  isOpen,
  isClosable = true,
  isCloseOnOverlayClick = true,
  onClose,
  className,
  dataTestId,
  ...rest
}: ModalProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);

  const titleId = React.useId();
  const [isRendered, setIsRendered] = React.useState(isOpen);

  React.useEffect(() => {
    if (isOpen) setIsRendered(true);
  }, [isOpen]);

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) return;
    if (!isOpen) setIsRendered(false);
  };

  React.useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const modal = containerRef.current;
    if (!modal) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        modal.focus();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return (
    <div
      className={overlayVariants({ state: isOpen ? "open" : "closed" })}
      onTransitionEnd={handleTransitionEnd}
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
        className={cn(
          modalVariants({ state: isOpen ? "open" : "closed" }),
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        <div className={headerVariants()}>
          <div className="flex-1 min-w-0">
            <h2 id={titleId} className="font-semibold break-words">
              {title}
            </h2>

            {description && (
              <p className="text-[14px] mt-2 break-words text-gi-gray">
                {description}
              </p>
            )}
          </div>

          {isClosable && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex items-center justify-center size-8 rounded-full shrink-0 transition hover:bg-gray-100"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        {children && <div className="mt-4 break-words">{children}</div>}

        {actions && (
          <div className={footerVariants()}>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={actionVariant}>Confirm</Button>
          </div>
        )}
      </div>
    </div>
  );
}