import React from "react";
import { Outlet } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/store";
import "./App.css";

import NavBar from "./components/navbar/NavBar";
import LoadPage from "./pages/load/LoadPage";

const persistor = persistStore(store);

function App() {
  return (
    <React.Suspense fallback={<LoadPage />}>
      <PersistGate loading={null} persistor={persistor}>
        <NavBar />
        <div className="mt-[42px]">
          <Outlet />
        </div>
      </PersistGate>
    </React.Suspense>
  );
}

export default App;
