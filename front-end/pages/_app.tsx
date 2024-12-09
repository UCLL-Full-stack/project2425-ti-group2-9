// These styles apply to every route in the application
import '@styles/global.css';
import { appWithTranslation } from "next-i18next";
import type { AppProps } from 'next/app'
 
const App=({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);