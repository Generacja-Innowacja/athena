import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  const baseProps = {
    title: "Test Modal",
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = "";
  });

  it("renders modal when isOpen=true", () => {
    render(<Modal {...baseProps}>Content</Modal>);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when isOpen=false", () => {
    render(
      <Modal {...baseProps} isOpen={false}>
        Hidden
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <Modal {...baseProps} description="Modal description">
        Content
      </Modal>,
    );

    expect(screen.getByText("Modal description")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <Modal {...baseProps} actions={<button>Confirm</button>}>
        Content
      </Modal>,
    );

    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();

    render(<Modal {...baseProps} onClose={onClose} />);

    const button = screen.getByRole("button", { name: /close dialog/i });
    await userEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render close button when isClosable=false", () => {
    render(
      <Modal {...baseProps} isClosable={false}>
        Content
      </Modal>,
    );

    expect(
      screen.queryByRole("button", { name: /close dialog/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onClose when clicking overlay", async () => {
    const onClose = vi.fn();
    render(<Modal {...baseProps} onClose={onClose} />);

    const overlay = screen.getByRole("dialog").parentElement!;
    await userEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when overlay clicked if isCloseOnOverlayClick=false", async () => {
    const onClose = vi.fn();
    render(
      <Modal {...baseProps} onClose={onClose} isCloseOnOverlayClick={false} />,
    );

    const overlay = screen.getByRole("dialog").parentElement!;
    await userEvent.click(overlay);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not close when clicking inside modal", async () => {
    const onClose = vi.fn();
    render(<Modal {...baseProps} onClose={onClose} />);

    const modal = screen.getByRole("dialog");
    await userEvent.click(modal);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<Modal {...baseProps} onClose={onClose} />);

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("locks body scroll when modal is open", () => {
    render(<Modal {...baseProps}>Content</Modal>);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when modal unmounts", () => {
    const { unmount } = render(<Modal {...baseProps}>Content</Modal>);

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("applies data-test-id attribute", () => {
    render(
      <Modal {...baseProps} dataTestId="modal-test">
        Content
      </Modal>,
    );

    expect(screen.getByTestId("modal-test")).toBeInTheDocument();
  });

  it("traps focus inside modal with Tab and Shift+Tab", () => {
    render(
      <Modal
        {...baseProps}
        actions={
          <>
            <button>First</button>
            <button>Second</button>
          </>
        }
      >
        <button>Inside</button>
      </Modal>,
    );

    const closeButton = screen.getByRole("button", { name: /close dialog/i });
    const secondAction = screen.getByText("Second");

    // initial focus
    expect(document.activeElement).toBe(closeButton);

    // ustaw focus na ostatni element
    secondAction.focus();
    expect(document.activeElement).toBe(secondAction);

    // Tab z ostatniego powinien wrócić na pierwszy
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Tab" });
    expect(document.activeElement).toBe(closeButton);

    // Shift+Tab z pierwszego powinien przejść na ostatni
    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Tab",
      shiftKey: true,
    });
    expect(document.activeElement).toBe(secondAction);
  });
});
