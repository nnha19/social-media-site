import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Navbar from "../components/Navbar/Navbar";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
