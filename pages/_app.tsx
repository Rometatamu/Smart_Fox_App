import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";


const openQuicksand=Quicksand({
  weight: "400",
  subsets: ["latin"],

});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <main className={openQuicksand.className}>
    <Component {...pageProps} />
    </main>
    </>
    );
}
