import { IGame } from "@/interfaces";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface Props {
  game: IGame;
}

export const Card: FC<Props> = ({ game }) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = existingCart.some((item: IGame) => item.id === game.id);
    setIsInCart(exists);
  }, [game.id]);

  const handleToggleCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (isInCart) {
      const updatedCart = existingCart.filter(
        (item: IGame) => item.id !== game.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsInCart(false);
    } else {
      const updatedCart = [...existingCart, game];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsInCart(true);
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-gray-300">
      <div className="relative">
        <Image
          alt={game.name}
          src={game.image}
          width={200}
          height={200}
          priority
          className="aspect-square w-full rounded-t-lg bg-gray-200 object-cover xl:aspect-7/8"
        />
        {game.isNew && (
          <div className="absolute top-4 left-4 bg-white/90 text-gray-600 text-md font-normal px-3 py-1 rounded-md shadow">
            New
          </div>
        )}
      </div>
      <h3 className="mt-4 text-md font-bold text-gray-500 uppercase">
        {game.genre}
      </h3>
      <div className="flex items-center justify-between">
        <h3 className="mt-2 text-lg font-bold text-gray-700">{game.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${game.price}</p>
      </div>
      <button
        onClick={handleToggleCart}
        className="mt-4 w-full font-semibold flex items-center justify-center rounded-md px-6 py-3 text-base hover:bg-indigo-50 cursor-pointer border"
      >
        {isInCart ? "REMOVE" : "ADD TO CART"}
      </button>
    </div>
  );
};
