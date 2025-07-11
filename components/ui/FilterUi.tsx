import { useContext, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { GameContext } from "@/context/game";
import { UiContext } from "@/context/ui";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const FilterUi = () => {
  const { games, getGames } = useContext(GameContext);
  const { filter, setFilter } = useContext(UiContext);

  useEffect(() => {
    getGames(filter, 1);
  }, [filter, getGames]);

  return (
    <>
      <div className="flex items-center justify-start sm:justify-end pt-2 px-6 sm:px-36">
        <p className="text-xl font-bold text-gray-700 ">Genre</p>
        <div className="px-6 text-xl text-gray-500"> | </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="flex items-center justify-between w-54 sm:w-[230px] gap-x-1.5 px-3 py-2 text-xl  text-gray-900">
              <p>{filter == "" ? "All" : filter}</p>
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-6 text-gray-500"
              />
            </MenuButton>
          </div>
          <MenuItems
            //static for testing
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden max-h-[200px] overflow-y-auto data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem>
              <div
                onClick={() => {
                  setFilter("");
                  getGames();
                }}
                className="block px-4 py-2 text-lg text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                All
              </div>
            </MenuItem>
            {games.availableFilters.map((item) => (
              <div key={item} className="py-1">
                <MenuItem>
                  <div
                    onClick={() => {
                      setFilter(item);
                      getGames(item);
                    }}
                    className="block px-4 py-2 text-lg text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    {item}
                  </div>
                </MenuItem>
              </div>
            ))}
          </MenuItems>
        </Menu>
      </div>
      <hr className="mt-8 sm:mt-13 border-t border-gray-200 w-full" />
    </>
  );
};
