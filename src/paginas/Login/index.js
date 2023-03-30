import logo from '../../assets/logo.png';

import {  useContext, useState } from 'react';


import api from "../../services/api";
import { Link, useHistory } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import { setAuthToken } from '../../utils/setAuthToken';
import { limparCaches } from '../../utils/limparCaches';
import Usuario from '../../models/usuario';
import UserLogin from '../../models/userLogin';
import {Mensagens} from '../../enums/mensagens';


export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();
    const [user,setUser] = useContext(UserContext);

    function Logar(e){   
        e.preventDefault();

        setAuthToken();
     
       if(email !== '' && senha !==''){
          
            var userLogin= new UserLogin(email,senha)


/*
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(userLogin)
            };
            fetch('http://localhost:8081/api/Clientes/autenticar', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    history.push('/home'); 
                });
*/
           api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         
            api
            .post("/api/clientes/autenticar",userLogin)
            .then((response) =>
            {
                if (response.data.token != null)
                {
                    console.log(response.data)
                   
                     var usuario = new Usuario(response.data.id,response.data.nome,response.data.token,response.data.email,response.data.roles)
           
                     setUser(usuario.nome );
                      
                    //set JWT token to local
                    localStorage.setItem("usuario",JSON.stringify( usuario));
                    // set token no Head do api                  
                    setAuthToken(usuario.token);

                    //alert('user:'+user)
                    history.push('/home'); 
                  
                }
                else 
                {
                    limparCaches();
                    alert(Mensagens.UsuarioESenhaInvalida)
                } 
               
            })
            .catch((err) => {
                limparCaches();
                var erro =err.toString();;
             
                if (erro.includes('400') ||  erro.includes('404'))
                   alert(Mensagens.UsuarioESenhaInvalida )   
                else  {
                   alert(Mensagens.ErroGenerico + err +'\nFor support contact senior intern Yann by phone 95484-2050...')
                }
            });
        
        }
        else{
            limparCaches();
            alert(Mensagens.EmailESenhaObrigatorio)
        }
    }
    return(
        <div className='fundo-container'>
        <div className='container'>
            <img src={logo} alt='Logo do restaurante' />
            <div class="login-box">

                <form className="form-contato"  onSubmit={Logar}>
                    <div class="user-box">
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>E-mail</label>
                    </div>
                    <div class="user-box">
                        <input type="password" placeholder='****' value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <label>Senha</label>
                    </div><center>
                    <button type="submit" className='form-btn'>Login</button></center>
                </form>

                <p className='form-link'>Não possui cadastro? Registre-se
                <Link to="/cadastroCliente"> aqui</Link> .</p>
            </div>
        </div>
    </div>
    )
}