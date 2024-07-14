import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "../src/components/alert/alert";
import Home from "./containers/pages/home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route path="*" element={<Error404 />}></Route> */}
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
      <Alert />
    </Provider>
  );
}

export default App;
