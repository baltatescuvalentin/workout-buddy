import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import router from "./router";
import { RouterProvider } from "react-router";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import store from "./stores/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <RouterProvider router={router} />
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
