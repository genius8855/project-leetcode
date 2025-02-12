import { AppProps } from 'next/app'; // Import the correct types
import "@/app/globals.css"; // ✅ Ensure this is at the top

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}