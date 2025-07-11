import { FC } from "react";
import Link from "next/link";
import { IGame } from "@/interfaces";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  cart: IGame[];
}

export const CartHeader: FC<Props> = ({cart}) => {
  return (
    <div className="px-6 sm:px-30">
      <Link href="/" className="cursor-pointer flex items-center  mt-4 sm:mt-6">
        <ArrowLeftIcon aria-hidden="true" className="size-4 mr-3" />
        <p className="font-medium">Back to Catalog</p>
      </Link>
      <div className="pt-12 sm:pt-16">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-700">
          Your Cart
        </h1>
      </div>
      <div className="pt-2 sm:pt-3">
        <p className="text-xl sm:text-2xl font-normal tracking-tight text-gray-700">
          {cart.length} items
        </p>
      </div>
    </div>
  );
};
