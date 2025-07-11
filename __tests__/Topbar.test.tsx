import { render, screen } from "@testing-library/react";
import { Topbar } from "@/components/bars/TopBar";
import "@testing-library/jest-dom";

describe("Topbar", () => {
  it("renders the shop title", () => {
    render(<Topbar />);
    expect(screen.getByText("GamerShop")).toBeInTheDocument();
  });

  it("renders link to homepage", () => {
    render(<Topbar />);
    const homeLink = screen.getByRole("link", { name: /GamerShop/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders link to shopping cart", () => {
    render(<Topbar />);
    const cartLink = screen.getByRole("link", { name: /Shopping cart/i });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("renders the shopping cart icon", () => {
    render(<Topbar />);
    const icon = screen.getByTestId("shopping-cart-icon");
    expect(icon).toBeInTheDocument();
  });
});
