import { render, screen, waitFor } from "@testing-library/react";
import CartPage from "@/pages/cart";
import { IGame } from "@/interfaces";
import "@testing-library/jest-dom";

jest.mock("@/components/layouts/Layout", () => ({
  Layout: ({ children }: never) => <div>{children}</div>,
}));

jest.mock("@/components/CartHeader", () => ({
  CartHeader: ({ cart }: { cart: IGame[] }) => (
    <div>CartHeader ({cart.length})</div>
  ),
}));

jest.mock("@/components/CartItem", () => ({
  CartItem: ({ item }: { item: IGame }) => (
    <div className="flex justify-between text-lg text-gray-700 mb-3">
      <span>{item.name}</span>
      <span className="font-medium">${item.price}</span>
    </div>
  ),
}));

jest.mock("@/components/EmptyCart", () => ({
  EmptyCart: () => <div>EmptyCart Component</div>,
}));

describe("Cart Page", () => {
  const mockCart: IGame[] = [
    {
      id: "1",
      name: "Game 1",
      price: 29.99,
      genre: "",
      image: "",
      description: "",
      isNew: false,
    },
    {
      id: "2",
      name: "Game 2",
      price: 19.99,
      genre: "",
      image: "",
      description: "",
      isNew: false,
    },
  ];

  beforeEach(() => {
    localStorage.setItem("cart", JSON.stringify(mockCart));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  it("shows cart items if there are products", async () => {
    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText("CartHeader (2)")).toBeInTheDocument();
    });
    expect(screen.getAllByText("Game 1").length).toBeGreaterThan(1);
    expect(screen.getAllByText("$29.99").length).toBeGreaterThan(1);

    expect(screen.getAllByText("Game 2").length).toBeGreaterThan(1);
    expect(screen.getAllByText("$19.99").length).toBeGreaterThan(1);

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
    expect(screen.getByText("Order Total")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /checkout/i })
    ).toBeInTheDocument();
  });

  it("displays the EmptyCart component if the cart is empty", async () => {
    localStorage.setItem("cart", JSON.stringify([]));
    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText("EmptyCart Component")).toBeInTheDocument();
    });
  });

  it("handles correctly if there is nothing in localStorage", async () => {
    localStorage.removeItem("cart");
    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText("EmptyCart Component")).toBeInTheDocument();
    });
  });
});
