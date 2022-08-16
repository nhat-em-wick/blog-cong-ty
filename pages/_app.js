import "../styles/grid.css";
import "../styles/globals.css";

import { DefaultLayout, SidebarLayout } from "../components/Layouts";
import { HeadingProvider } from "../contexts";

function MyApp({ Component, pageProps }) {
  switch (Component.layout) {
    case "sidebar":
      return (
        <HeadingProvider>
          <SidebarLayout>
            <Component {...pageProps} />
          </SidebarLayout>
        </HeadingProvider>
      );
      break;
    default:
      return (
        <HeadingProvider>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </HeadingProvider>
      );
      break;
  }
}

export default MyApp;
