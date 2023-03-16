import React, { useContext } from "react";
import Context from "../../contexts/UserContext";

import Header from "../../componentes/Header";
import { ModalDialog } from "react-bootstrap";

export default function Home() {
  const [user] = useContext(Context);

  
  return (
    <main>
      <Header/>
  
      {/* <Carrossel/> */}
      {/* <Motoboy/> */}
      {/* <Maps/> */}

      
    </main>
  );
}