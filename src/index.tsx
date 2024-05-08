import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />}/>
      </Routes>
    </Router>
    
  </StrictMode>
);
