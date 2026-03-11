import { render, screen } from "@testing-library/react";

import { Section } from "./Section";

describe("<Section />", () => {
  it("renders title and children", () => {
    render(<Section title="Section title">Content</Section>);

    expect(screen.getByText("Section title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("passes data-test-id to root element", () => {
    render(
      <Section title="Title" dataTestId="section-root">
        Content
      </Section>,
    );

    const root = screen.getByTestId("section-root");
    expect(root).toBeInTheDocument();
  });

  it("renders actions on the right by default", () => {
    render(
      <Section title="Title" actions={<button>Action</button>}>
        Content
      </Section>,
    );

    const action = screen.getByRole("button", { name: "Action" });
    expect(action).toBeInTheDocument();
  });

  it("renders actions at the bottom when actionsPosition is bottom", () => {
    render(
      <Section
        title="Title"
        actions={<button>Bottom action</button>}
        actionsPosition="bottom"
      >
        Content
      </Section>,
    );

    const action = screen.getByRole("button", { name: "Bottom action" });
    expect(action).toBeInTheDocument();
  });

  it("accepts additional HTML attributes", () => {
    render(
      <Section title="Title" aria-label="section-aria">
        Content
      </Section>,
    );

    const root = screen.getByLabelText("section-aria");
    expect(root).toBeInTheDocument();
  });
});
