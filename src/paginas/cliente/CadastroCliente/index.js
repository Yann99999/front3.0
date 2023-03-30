import logo from '../../../assets/logo.png';
import './cadastro.css';
import { Link, useHistory } from 'react-router-dom';

import { useState } from 'react';
import { FiUser, FiLock, FiUnlock, FiMail } from "react-icons/fi";
import api from '../../../services/api'

export default function CadastroCliente() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const history = useHistory();




    function Cadastrar(e) {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            alert('Digite senhas iguais');
        }
        else if ((username !== '' && email !== '' && senha !== '' && confirmarSenha !== '') && senha === confirmarSenha) {
            var usuario = {
                nome: username,
                email: email,
                senha: senha,
                roles: 'USER'
            }

            //  api.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000';
            //  api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            //  api.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';
            //api.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';

            api.defaults.headers.post['Authorization'] = 'Basic user:123';


            api
                .post("/api/clientes/cadastrar", usuario)
                .then((response) => {
                    if (response.data != null) {
                        alert("Usuário cadastrado com sucesso");
                        history.push('/')
                    }
                    else alert("Error on create new user, contact the admin")
                })
                .catch((err) => {
                    var erro = err.toString();;

                    if (erro.includes('400'))
                        alert(`Email ${email} já cadastrado!`)
                    else alert("ops! ocorreu um erro:\n" + err)


                });


        }
    }
    return (
        <div className='fundo-container'>
            <div className='container'>
                <img src={logo} alt='Logo do restaurante' />
                <div class="login-box">

                    <form className="form-login"  onSubmit={Cadastrar}>
                        <div class="user-box">
                            <input type="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />

                            <label>Username</label>
                        </div>
                        <div class="user-box">
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>E-mail</label>
                        </div>
                        <div class="user-box">
                            <input type="password" placeholder='****' value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <label>Senha</label>
                        </div><center>
                        <div class="user-box">
                            <input type="password" placeholder='****' value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                            <label>Confirmar Senha</label>
                        </div>
                        <button type="submit" className='form-btn'>Cadastrar-se</button></center>
                    </form>

                    <p className='form-link'>Não possui cadastro? Registre-se
                    <Link to="/"> aqui</Link> .</p>
                </div>
            </div>
        </div>
    )
}