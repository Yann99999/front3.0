import logo from '../../assets/logo.png'

//import '../DropdownCardapio/button.css'
import './header.css'

import { FiLogOut, FiUser } from "react-icons/fi";

import UserContext from '../../contexts/UserContext'
import React, { useContext, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { setAuthToken } from '../../utils/setAuthToken';
import { limparCaches } from '../../utils/limparCaches';

export default function Header() {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const [mostrarBotao, setMostarBotao] = useState(false)
    
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    setUser(usuario.nome);
    let roles = usuario.roles
    var liberarCadastro = roles.includes("ADMIN");

    const logout = () => {
        limparCaches();
        setAuthToken();
        setUser('');
        history.push("/")

    }

    function ToggleButton() {
        mostrarBotao === true ? setMostarBotao(false) : setMostarBotao(true)
    }
    
    return (
        <header>
            <div className='menu'>
                <ul className='header-links-box'>
                    <li className="ocultar">aaa</li>
                    <li className='header-links'><Link to="/home">Home</Link></li>
                    <li className='header-links'>Sobre</li>
                    <li className='header-links'><img src={logo} alt="Logo" /></li>
                    <li className='header-links'><Link to="/contato">Contato</Link></li>
                    <li className='header-links'><Link to="/produtos">Menu</Link></li>
                    <li>
                        <button onClick={ToggleButton} className="header-user-button">
                            <FiUser size={22} color='rgb(208, 203, 203)' />
                        </button>
                    </li>
                </ul>
                <div className='header-user'>
                    {mostrarBotao &&
                        <div className='header-user-list'>
                            <ul>
                            <span>{user}</span>
                                <li className='header-links'>Editar Perfil</li>
                                <li className='header-links'>Meus Pedidos</li>
                                {
                                    liberarCadastro && <li className='header-links'><Link to="/categoria">Categorias</Link></li>
                                }
                                {
                                   liberarCadastro &&  <li className='header-links'><Link to="/produto/cadastro">Produto</Link></li>
                                }


                                <li>
                                    <button onClick={logout} className="btn-logout">
                                        <FiLogOut size={22} color='#948849' />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }

                </div>

            </div>
        </header>
    )
}