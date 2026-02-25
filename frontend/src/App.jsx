import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Contribute from "./pages/Contribute"

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/results" element={<Results/>}/>
        <Route path="/contribute" element={<Contribute/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;