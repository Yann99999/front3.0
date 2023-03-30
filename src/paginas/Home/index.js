import React, { useContext } from "react";
import Context from "../../contexts/UserContext";

import Header from "../../componentes/Header";
import { CardClass } from "./Cards/cardHome";


export default function Home() {
  const [user] = useContext(Context);

  
  return (
    <main>
      <Header/>
     <CardClass/>
  
      {/* <Carrossel/> */}
      {/* <Motoboy/> */}
      {/* <Maps/> */}

      
    </main>
  );
}