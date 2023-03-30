import React, { useContext, useEffect, useState } from "react";
import api from "../../../services/api";
import Context from "../../../contexts/UserContext";
import Header from "../../../componentes/Header";
import './produto.css';
import misterio from '../../../assets/misterio.png'

export default function ConsultaProduto() {
  const [user] = useContext(Context);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProduto();
  }, []);

  const carregarProduto = () => {

    api.get('/api/produtos')
      .then(resposta => {
        setProdutos(resposta.data);
      })
      .catch(error => { console.log(error) })
  }

 
  return (
    <div>
      <Header></Header>
      <main className="mainProduto">

        <nav>
          <ul className="cardapio-list-links">
            <li>Hambúrguers</li>
            <li>Porções</li>
            <li>Bebidas</li>
            <li>Sobremesas</li>
          </ul>
        </nav>

       
          <section className="cardapio-container">
            {produtos.map((item) => {
            return (
              <article className="card">
               
                <img src={item.files ?
                  `data:image/jpeg;base64,${item.files.data}`:
                  process.env.PUBLIC_URL + misterio} class="card-img-item" />
                <div className="card-info">
                  <p className="text-title">{item.nome}</p>
                  <p className="text-body">R${item.preco}</p>
                  <button className="card-button-item">Adicionar</button>
                </div>
              </article>
            )
          })}
        </section>
      </main>


    </div>

  );
}


