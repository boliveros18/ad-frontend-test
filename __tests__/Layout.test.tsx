import { render, screen } from "@testing-library/react";
import { Layout } from "@/components/layouts/Layout";
import { UiContext } from "@/context/ui";

jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "inter-font" }),
}));

const baseMockContext = {
  isLoading: false,
  filter: "",
  setFilter: jest.fn(),
  setIsLoading: jest.fn(),
};

describe("Layout", () => {
  it("renders children correctly", () => {
    render(
      <UiContext.Provider value={baseMockContext}>
        <Layout>
          <p>Test content</p>
        </Layout>
      </UiContext.Provider>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies Inter font class", () => {
    const { container } = render(
      <UiContext.Provider value={baseMockContext}>
        <Layout>
          <p>Test content</p>
        </Layout>
      </UiContext.Provider>
    );

    expect(container.firstChild).toHaveClass("inter-font");
  });

  it("shows LoadingUi when isLoading is true", () => {
    const loadingMockContext = {
      ...baseMockContext,
      isLoading: true,
    };

    render(
      <UiContext.Provider value={loadingMockContext}>
        <Layout>
          <p>Test content</p>
        </Layout>
      </UiContext.Provider>
    );

    expect(screen.getByTestId("loading-ui")).toBeInTheDocument();
  });
});
