import Header from "../../componentes/Header";
import './contato.css'
export default function Contato() {
    return (
        <div>
        <Header />
        <main className="mainContato">
            <h1>Fale Conosco</h1>
            <div class="contato-box">    
                <form className="form-contato">
                    <div class="user-box">
                        <input type="text" name="" required=""/>
                            <label>Nome</label>
                    </div>
                    <div class="user-box">
                        <input type="email" name="" required=""/>
                            <label>Email</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="" required=""/>
                            <label>Assunto</label>
                    </div>
                    <button type="submit" className='contato-btn' >Enviar</button>
                
                </form>
            </div>
        </main>

        </div>
    )
}