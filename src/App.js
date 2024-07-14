
import './styles/index.css';
import { BrowserRouter as Route,Router,Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store"
import Alert from "../src/components/alert/alert"

function App() {
  return (
    <Provider store={store}>
 <Router>
  <Routes>
  {/* <Route path="*" element={<Error404 />}></Route>
  <Route path="/" element={<Home/>}></Route> */}
  hola
  </Routes>
 </Router>
 <Alert/>
    </Provider>
  );
}

export default App;
