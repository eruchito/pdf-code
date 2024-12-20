// src/pages/_app.js
import '../styles/globals.css'; // Verifica que esta ruta sea correcta

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
