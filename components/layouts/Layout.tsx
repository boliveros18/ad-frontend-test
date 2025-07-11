import { FC, ReactNode, useContext } from "react";
import type { Metadata } from "next";
import { UiContext } from "@/context/ui";
import { Inter } from "next/font/google";
import { Topbar } from "@/components/bars/TopBar";
import { Footer } from "@/components/Footer";
import { LoadingUi } from "../ui/LoadingUi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

interface Props {
  children?: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const { isLoading } = useContext(UiContext);
  return (
    <div className={`${inter.className}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        {isLoading && <LoadingUi />}
      </div>
      <Topbar />
      {children}
      <Footer />
    </div>
  );
};
