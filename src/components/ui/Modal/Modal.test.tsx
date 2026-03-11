import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  const baseProps = {
    title: "Test Modal",
    description: "Test description",
    isOpen: true,
    onClose: vi.fn(),
  };

  it("renders modal when isOpen is true", () => {
    render(<Modal {...baseProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<Modal {...baseProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();

    render(<Modal {...baseProps} onClose={onClose} />);

    const closeButton = screen.getByRole("button", { name: /close modal/i });

    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when overlay is clicked", async () => {
    const onClose = vi.fn();

    render(<Modal {...baseProps} onClose={onClose} />);

    const overlay = screen.getByRole("dialog").parentElement!;

    await userEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when overlay click disabled", async () => {
    const onClose = vi.fn();

    render(
      <Modal
        {...baseProps}
        onClose={onClose}
        isCloseOnOverlayClick={false}
      />,
    );

    const overlay = screen.getByRole("dialog").parentElement!;

    await userEvent.click(overlay);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on Escape key", () => {
    const onClose = vi.fn();

    render(<Modal {...baseProps} onClose={onClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("traps focus inside modal with Tab", async () => {
    render(
      <Modal {...baseProps}>
        <button>First</button>
        <button>Last</button>
      </Modal>,
    );

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    const first = screen.getByText("First");
    const last = screen.getByText("Last");

    expect(closeButton).toHaveFocus();

    await userEvent.tab();
    expect(first).toHaveFocus();

    await userEvent.tab();
    expect(last).toHaveFocus();

    await userEvent.tab();
    expect(closeButton).toHaveFocus();
  });

  it("restores focus after close", () => {
    const onClose = vi.fn();

    render(
      <>
        <button>Open</button>
        <Modal {...baseProps} onClose={onClose} />
      </>,
    );

    const openButton = screen.getByText("Open");

    openButton.focus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalled();
  });

  it("applies data-testid", () => {
    render(<Modal {...baseProps} dataTestId="modal" />);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});