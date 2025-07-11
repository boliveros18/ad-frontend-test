import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GameProvider } from "@/context/game";
import { UiProvider } from "@/context/ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UiProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </UiProvider>
  );
}
