import { useEffect, useState } from "react";
import { Layout } from "@/components/layouts/Layout";
import { IGame } from "@/interfaces";
import { CartHeader } from "@/components/CartHeader";
import { CartItem } from "@/components/CartItem";
import { EmptyCart } from "@/components/EmptyCart";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const Cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(Cart);
  }, []);

  return (
    <Layout>
      <CartHeader cart={cart} />
      {cart.length != 0 ? (
        <div className="xl:flex justify-between  px-6 sm:px-30">
          <div className="my-16">
            <div className="flex items-center justify-center ">
              <ul role="list" className="-my-6 px-4 divide-y divide-gray-200 ">
                {cart.map((item: IGame) => (
                  <div key={item.id}>
                    <CartItem item={item} setCart={setCart} />
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="pb-16 xl:pt-16 xl:min-w-md h-full flex flex-col items-center justify-center sm:pl-10">
            <div className="border w-full rounded-lg px-6 py-8 max-w-xl border-gray-300 shadow-sm bg-white">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800 mb-3">
                Order Summary
              </h2>
              <h2 className="text-lg  tracking-tight text-gray-800 mb-12">
                {cart.length} items
              </h2>
              {cart.map((item: IGame) => (
                <div
                  key={item.id}
                  className="flex justify-between text-lg text-gray-700 mb-3"
                >
                  <span>{item.name}</span>
                  <span className="font-medium">${item.price}</span>
                </div>
              ))}
              <hr className="my-4 border-gray-200" />
              <div className="flex justify-between text-gray-900 text-xl font-bold mb-6">
                <span>Order Total</span>
                <span>
                  $
                  {(
                    cart.reduce(
                      (acc: number, item: IGame) => acc + item.price,
                      0
                    ) + 5
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            <button className="cursor-pointer mt-10 max-w-xl w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-md font-semibold  transition">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  );
}
