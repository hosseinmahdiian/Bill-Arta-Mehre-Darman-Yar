import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Acconut from "./components/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Acconut />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
