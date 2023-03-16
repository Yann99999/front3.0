import React, { useEffect, useState } from "react";
import Card from "../../componentes/card";
import FormGroup from "../../componentes/formgroup";
import CategoriasTable from "./categoriasTable";

import { toast } from 'react-toastify';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import api from "../../services/api";
import Header from "../../componentes/Header";
import './categoria.css';

import { FiPlus } from "react-icons/fi";

function CadastroCategoria() {
    const [produtos, setProdutos] = useState([]);

    const [produtosDeletar, setProdutosDeletar] = useState({})
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showEditProduto, setShowEditProduto] = useState(false);



    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [produtoEditar, setProdutoEditar] = useState({})
    const [tituloForm, setTituloForm] = useState('')

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

    const abrirConfirmacao = (produto) => {
        cancelarEdicao()
        setShowConfirmDialog(true);
        setProdutosDeletar(produto);
    }

    const cancelarDelecao = () => {
        setShowConfirmDialog(false);
        setProdutosDeletar({})
    }

    const cancelarEdicao = () => {
        setShowEditProduto(false);
        setProdutoEditar({});
    }

    const confirmDialogFooter = () => (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} />
        </div>
    );


    const deletar = () => {
         api.delete('/api/produtos/'+ produtosDeletar.id)
            .then(response => {
                console.log(response.status)
                const produtos = produtos;
                const index = produtos.indexOf(produtos);
                produtos.splice(index, 1);
                setProdutos(produtos);
                setShowConfirmDialog(false);
                toast.success('Categoria excluído com sucesso!');
            })

            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded

                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    toast.error(`Error: ${error.response.status} - ${error.response.data.error}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });


    }


    const abrirEdicao = (produto) => {
        cancelarDelecao();
        setId(produto.id)
        setNome(produto.nome)
        setTituloForm('Edição')
        setShowEditProduto(true)
        setProdutoEditar(produto);
    }


    const abrirInclusao = () => {
        cancelarDelecao();
        setId('')
        setNome('')
        setTituloForm('Inclusão')
        setShowEditProduto(true)
    }


    const editar = () => {
        const produto = {
            id: id,
            nome: nome
        }

        if (id === '') {
            api.post('/api/produtos', produto)
                .then(response => {

                    var prodNew = response.data

                    let listaProd = produtos;
                    listaProd.push(prodNew);
                    setProdutos(listaProd);

                    setShowEditProduto(false)
                    setProdutoEditar({})
                    toast.success('Produto cadastrado com sucesso!');
                })
                .catch(error => {
                    toast.error(error);
                });
        }
        else {
            api.put('/api/produtos/' + produto.id, produto)
                .then(response => {
                    let listaProd = listaProd;
                    const index = listaProd.indexOf(produtoEditar);

                    listaProd[index] = produto;
                    setProdutos(listaProd)
                    setShowEditProduto(false);
                    setProdutoEditar({})
                    toast.success('Categoria alterado com sucesso!');
                })
                .catch(error => {
                    toast.error(error);
                });
        }
    }

    const editFooter = (
        <div>
            <Button label="Salvar" icon="pi pi-save" onClick={editar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarEdicao} />
        </div>
    );


    return (
        <main className='mainCadastro'>
            <div className="divHeader">
                <Header />
            </div>

            <Card title="Consultar Produtos">
                <div>
                    <button onClick={abrirInclusao} className="cadastrar-produtos-btn">
                        <FiPlus color="white" size={22}></FiPlus>
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">

                            <CategoriasTable produtos={produtos}
                                deleteAction={abrirConfirmacao}
                                editAction={abrirEdicao}     ></CategoriasTable>

                        </div>
                    </div>
                </div>
                <div className="modal-exclusao">
                    {/* <span>Tem certeza de que deseja excluir o produto do sistema?</span>
                    <div className="modal-exclusao-btns">
                        <Button label="Salvar" icon="pi pi-save" onClick={editar} />
                        <Button label="Cancelar" icon="pi pi-times" onClick={cancelarEdicao} />
                    </div> */}
                    
                    <Dialog header="Confirmação"
                        visible={showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => setShowConfirmDialog(false)}>
                        <p>Confirma a exclusão do produto?</p>
                    </Dialog>
                </div>
                <div>
                    <Dialog header={tituloForm}
                        visible={showEditProduto}
                        style={{ width: '50vw' }}
                        footer={editFooter}
                        modal={true}
                        onHide={() => setShowEditProduto(false)}>
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNome" label="Nome: *" >
                                <input type="text"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    className="form-control"
                                    id="inputEditNome"
                                    aria-describedby="nomeHelp"
                                    placeholder="Digite o nome do produto">
                                </input>
                            </FormGroup>

                        </div>
                    </Dialog>

                </div>
            </Card>

        </main>

    )

}

export default CadastroCategoria;