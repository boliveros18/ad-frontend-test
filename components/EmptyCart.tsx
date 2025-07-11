import Link from "next/link";

export const EmptyCart = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 pt-10 pb-24 sm:pt-20 sm:pb-28 lg:px-8 ">
      <div className="text-center">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          Your cart is empty
        </h1>
        <p className="mt-6 text-lg  text-pretty text-gray-500 sm:text-xl/8">
          {"You haven't added any items to your cart yet."}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-gray-700 hover:bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
};
