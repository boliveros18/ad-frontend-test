import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export const Topbar: FC = () => {
  return (
    <Disclosure as="nav" className="bg-gray-100 border-b border-gray-100">
      <div className="mx-auto px-6 sm:px-30">
        <div className="relative flex h-16 items-center justify-between">
          <Link
            href="/"
            className="items-start text-2xl font-semibold text-gray-600 cursor-pointer"
          >
            GamerShop
          </Link>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              href="/cart"
              className="relative rounded-full text-black  hover:bg-gray-200 p-2 cursor-pointer"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Shopping cart</span>
              <ShoppingCartIcon aria-hidden="true" className="size-6"   data-testid="shopping-cart-icon" />
            </Link>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};
