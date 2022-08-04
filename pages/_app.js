import '../styles/grid.css'
import "../styles/globals.css";

import { DefaultLayout } from "../components/Layouts";

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
