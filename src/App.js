import React, { useState } from "react";
import Rotas from "./componentes/Rotas";
import UserContext from "./contexts/UserContext";
import './App.css'
import { setAuthToken } from "./utils/setAuthToken";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";        //icons

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState('');
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    setAuthToken(usuario.token);
  }

  return (
    <>
      <ToastContainer autoClose={3000} transition={Zoom} theme={'colored'} />
      <UserContext.Provider value={[user, setUser]}>
        <Rotas />
      </UserContext.Provider>
    </>

  );
}

export default App;
