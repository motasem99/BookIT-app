// Style
import '../styles/globals.css';

// Redux
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
