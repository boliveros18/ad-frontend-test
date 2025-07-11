import { IGame } from "@/interfaces";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FC, SetStateAction, Dispatch } from "react";

interface Props {
  item: IGame;
  setCart: Dispatch<SetStateAction<never[]>>;
}

export const CartItem: FC<Props> = ({ item, setCart }) => {
  const handleRemoveCart = (id: string) => {
    const Cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = Cart.filter((item: IGame) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <li key={item.id} className="sm:flex py-6 max-w-sm sm:max-w-xl">
      <div className="relative w-65 h-40 shrink-0 overflow-hidden  border border-gray-200">
        <Image
          alt={item.name}
          src={item.image}
          width={200}
          height={200}
          priority
          className="size-full object-cover"
        />
        {item.isNew && (
          <div className="absolute top-4 left-4 bg-white/90 text-gray-600 text-sm font-normal px-3 py-1 rounded-md shadow">
            New
          </div>
        )}
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex items-center justify-between text-base font-medium text-gray-900">
            <h3 className="mt-4 sm:mt-1 text-md font-bold text-gray-500 uppercase">
              {item.genre}
            </h3>
            <div
              className="cursor-pointer -mt-82 sm:mt-0"
              onClick={() => handleRemoveCart(item.id)}
            >
              <XMarkIcon aria-hidden="true" className="size-5" />
            </div>
          </div>
          <h3 className="mt-2 text-lg font-bold text-gray-700">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
        </div>
        <div className="flex flex-1 items-end justify-end text-sm">
          <div className="flex">
            <p className="mt-1 text-lg font-bold text-gray-900">
              ${item.price}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
