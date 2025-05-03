//src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    success: {
      icon: "✅",
    },
    error: {
      icon: "❌",
    },
  }}/>
      <>
        <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
      </>
    </AuthProvider>
  );
}
