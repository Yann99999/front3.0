import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import CadastroCliente from "../../paginas/cliente/CadastroCliente";
import Login from "../../paginas/Login";
import Home from "../../paginas/Home";
import Contato from "../../paginas/Contato";
import RouteGuard from "../RouteGuard";
import CadastroCategoria from "../../paginas/categoria/cadastroCategoria";
import ConsultaProduto from "../../paginas/produto/ConsultaProduto";

import CadastroProduto from "../../paginas/produto/CadastroProduto/cadastroProduto";


export default function Rotas(){
    return(
     
        <BrowserRouter>
            <Route component={Login} path="/" exact/>
            {/* <Route component={Login} path="/login" exact/> */}
            <Route component={CadastroCliente} path="/cadastrocliente"/>
            <Route component={CadastroCategoria} path="/categoria"/>
            <Route component={CadastroProduto} path="/produto/cadastro"/>
            <Route component={ConsultaProduto} path="/produtos"/>
            <RouteGuard component={Home} path="/home"/>         
            <RouteGuard component={Contato} path="/contato"/>         
        </BrowserRouter>
       
    )
}