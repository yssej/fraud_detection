import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UserProvider} from "./context/userContext.jsx";
import {BrowserRouter} from "react-router-dom";
import {GlobalHistory} from "./components/GlobalHistory.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
          <BrowserRouter>
              <GlobalHistory />
              <App />
          </BrowserRouter>
      </UserProvider>
  </StrictMode>,
)
