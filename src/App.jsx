import { Toaster } from "react-hot-toast";
import { BrowserRouter} from "react-router-dom";
import Acconut from "./components/Account";
import Print from "./components/Print";
import Routers from "./router/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routers />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
