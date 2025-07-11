import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="py-19 bg-[#404040] flex items-center justify-center">
      <Link href="/">
        <Image alt="logo" src="/logo.png" width={195} height={80} priority />
      </Link>
    </div>
  );
};
