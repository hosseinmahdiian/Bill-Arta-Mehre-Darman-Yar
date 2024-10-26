import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Acconut from "./components/Account";
import Print from "./components/Print";
import Routers from "./router/Router";
import { useReducer } from "react";
import { FnReducer, init } from "./constant/constant";
import { reducerContext } from "./context/context";
function App() {
  const reducer = useReducer(FnReducer, init);
  return (
    <>
      <reducerContext.Provider value={reducer}>
        <BrowserRouter>
          <Routers />
          <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
      </reducerContext.Provider>
    </>
  );
}

export default App;
