import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@bites/auth";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;
