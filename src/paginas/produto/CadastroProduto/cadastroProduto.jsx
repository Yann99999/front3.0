    import React, { useEffect, useState } from "react";
import Card from "../../../componentes/card";
import FormGroup from "../../../componentes/formgroup";
import SelectMenu from "../../../componentes/selectMenu";
import ProdutosTable from "./produtosTable";

import { toast } from 'react-toastify';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import api from "../../../services/api";
import Header from "../../../componentes/Header";
import './produto.css';

import { FiPlus } from "react-icons/fi";

function CadastroProduto() {
    const [produtos, setProdutos] = useState([]);

    const [produtosDeletar, setProdutosDeletar] = useState({})
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showEditProduto, setShowEditProduto] = useState(false);



    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [categoriaId, setCategoriaId] = useState('')
    const [categoriaText, setCategoriaText] = useState('')

    const [listaCategoria, setListaCategoria] = useState([])


    const [produtoEditar, setProdutoEditar] = useState({})
    const [tituloForm, setTituloForm] = useState('')

    const [selectedFile, setSelectedFile] = useState();
    const [fileFromUpload, setFileFromUpload] = useState();
    const [imgExiste, setImgExiste] = useState(false);

    const handleImage = (e) => {
          const MAX_FILE_SIZE = 128 
        setSelectedFile(e.target.files[0])
        const fileSizeKiloBytes = (e.target.files[0].size / 1024).toFixed(1)


        if(fileSizeKiloBytes > MAX_FILE_SIZE){
                       toast.warning(`File size (${fileSizeKiloBytes} kbytes)is greater than maximum limit(128Kbytes) for ${e.target.files[0].name}. Yann's mistake never more`);
     
                       setSelectedFile(null)
                       setFileFromUpload(process.env.PUBLIC_URL + `/images/noImage.jpg`)
      return
    }
        
        setFileFromUpload(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        carregarProduto();
        carregarCategoria();
    }, []);

    const carregarProduto = () => {

        api.get('/api/produtos')
            .then(resposta => {
                setProdutos(resposta.data);
            })
            .catch(error => { console.log(error) })
    }

    const carregarCategoria = () => {
        api.get('/api/categorias')
            .then(resposta => {
                let opc = []
                let item = { label: 'Selecione...', value: '' }
                opc.push(item);

                resposta.data.map((cate) => {
                    item = { label: cate.nome, value: cate.id }
                    return opc.push(item);
                });


                setListaCategoria(opc)

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
        api.delete('/api/produtos/' + produtosDeletar.id)
            .then(response => {
                //console.log(response.status)
                const produtosLst = produtos;
                const index = produtosLst.indexOf(produtosDeletar);
                produtos.splice(index, 1);
                setProdutos(produtosLst);
                setShowConfirmDialog(false);
                toast.success('Produto excluído com sucesso!');
            })

            .catch(function (error) {
                if (error.response) {
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
        setDescricao(produto.descricao)
        setPreco(produto.preco)
        setQuantidade(produto.quantidade)

        setCategoriaId(produto.categoria.id)
       
        setCategoriaText(produto.categoria.nome);
      

        setTituloForm('Edição')
        setShowEditProduto(true)
        setProdutoEditar(produto);
        setImgExiste(false)

        api.get(`/api/getimage/${produto.id}`)
            .then(response => {

                if (response.data.content !== undefined) {
                    setFileFromUpload(`data:image/jpeg;base64,${response.data.content}`)
                    setImgExiste(true);
                    // console.log(response.data.content);
                }
                else {
                    setFileFromUpload(process.env.PUBLIC_URL + `/images/noImage.jpg`)
                }
            })
            .catch(error => {
                toast.error(error);
            });


    }


    const abrirInclusao = () => {
        cancelarDelecao();
        setId('')
        setNome('')
        setDescricao('')
        setPreco('')
        setQuantidade(0)
        setCategoriaId('')
        setCategoriaText('');
        setTituloForm('Inclusão')
        setShowEditProduto(true)
        setFileFromUpload(process.env.PUBLIC_URL + `/images/noImage.jpg`)
        setSelectedFile(null);
        setImgExiste(false)
    }

    const validarProduto = (produto) =>{
        if (produto.categoria.id === ''){
            toast.error("Informe a categoria do produto");
            return false;
           }
          
        if (!(produto.nome.trim())){
            toast.error("Informe o nome do produto");
            return false;
           }
           
           if (!(produto.descricao.trim())){
            toast.error("Informe a descrição do produto");
            return false;
           }
           
       if (!Number(produto.preco)){
        toast.error("Preço inválido do produto");
        return false;
       }
       
       if (!Number(produto.quantidade)){
         toast.error("Quantidade inválida do produto");
        return false;
       }
       return true;  
    }

    const editar = () => {
        const produto = {
            id: id,
            nome: nome,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade,
            categoria: {
                id: categoriaId,
                nome: categoriaText
            }
        }
        if (!validarProduto(produto)){
            return;
           
            
        }

        if (id === '') {
            console.log('Inserção:')

            console.log(id)
            api.post('/api/produtos', produto)
                .then(response => {

                    var prodNew = response.data

                    let listaProd = produtos;
                    listaProd.push(prodNew);
                    setProdutos(listaProd);

                    setShowEditProduto(false)
                    setProdutoEditar({})

                    salvarImg(prodNew)

                })
                .catch(error => {
                    toast.error(error);
                });
        }
        else {
            console.log('update:')
            api.put('/api/produtos/' + produto.id, produto)
                .then(response => {
                    let listaProd = produtos;
                    const index = listaProd.indexOf(produtoEditar);
                    listaProd[index] = produto;
                    setProdutos(listaProd)
                    setShowEditProduto(false);
                    setProdutoEditar({})
                    salvarImg(produto)

                  //  console.log(selectedFile)

                })
                .catch(error => {
                    toast.error(error);
                });
            api.defaults.headers.post['Content-Type'] = 'application/json';

        }
    }

    const salvarImg = (produto) => {
        const tipoOp = produto.id ? "alterado" : "cadastrado";
        const msg = imgExiste || selectedFile ? `Produto ${tipoOp} com sucesso!` : `Produto ${tipoOp} sem imagem com sucesso!`;

        if (selectedFile != null) {
            let file = new FormData();
            file.append('file', selectedFile);
            //console.log(file); 
            //alert("prod id: " + produto.id)

            api.post(`api/uploadfile/${produto.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    //console.log(response);
                    toast.success(msg);
                });
            setSelectedFile(null);
        }
        else {
            toast.success(msg);
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
                    <button onClick={abrirInclusao} className="cadastrar-btn">
                        <FiPlus color="white" size={22}></FiPlus>
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">

                            <ProdutosTable produtos={produtos}
                                deleteAction={abrirConfirmacao}
                                editAction={abrirEdicao}     ></ProdutosTable>

                        </div>
                    </div>
                </div>
                <div className="modal-exclusao">
                    <Dialog header="Confirmação"
                        visible={showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => setShowConfirmDialog(false)}>
                        <p>Confirma a exclusão do produto?</p>
                    </Dialog>
                </div>
                <div className="modal-edicao">
                    <Dialog
                        header={tituloForm}
                        headerStyle={{ background: '#948849', color: 'azure' }}

                        visible={showEditProduto}
                        style={{ width: '50%', backgroundColor: 'red' }}
                        footer={editFooter}
                        modal={true}
                        onHide={() => setShowEditProduto(false)}>
                        <div className="bs-component1">
                            <div id="divDados">
                                <FormGroup htmlFor="inputCategoria" label="Categoria: " >
                                    <SelectMenu className="form-control" lista={listaCategoria}
                                        value={categoriaId}
                                        onChange={e => {
                                            setCategoriaId(e.target.value);
                                            setCategoriaText(e.target.options[e.target.selectedIndex].text);
                                            }}>

                                    </SelectMenu>
                                </FormGroup>
                                <FormGroup htmlFor="inputNome" label="Nome: " >
                                    <input type="text"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        className="form-control w80"
                                        id="inputEditNome"
                                        aria-describedby="nomeHelp"
                                        placeholder="Digite o nome do produto">
                                    </input>

                                </FormGroup>
                                <FormGroup htmlFor="inputDescricao" label="Descrição: " >

                                    <textarea rows="3"
                                        value={descricao}
                                        onChange={e => setDescricao(e.target.value)}
                                        className="form-control w80"
                                        id="inputEditDescricao"
                                        s aria-describedby="descricaoHelp"
                                        placeholder="Digite a descrição do produto">
                                    </textarea>
                                </FormGroup>
                                <div className="formgroup-row">
                                    <FormGroup htmlFor="inputPreco" label="Preço: " >
                                        <input type="text"
                                            value={preco}
                                            onChange={e => setPreco(e.target.value)}
                                            className="form-control"
                                            id="inputEditPreco"
                                            aria-describedby="precoHelp"
                                            placeholder="Digite o preço do produto">
                                        </input>
                                    </FormGroup>

                                    <FormGroup htmlFor="inputQuantidade" label="Quantidade: " >
                                        <input type="text"
                                            value={quantidade}
                                            onChange={e => setQuantidade(e.target.value)}
                                            className="form-control"
                                            id="inputEditQuantidade"
                                            aria-describedby="precoHelp"
                                            placeholder="Digite a quantidade do produto no estoque">
                                        </input>
                                    </FormGroup>

                                </div>



                            </div>
                            <div className="formImage">
                                <FormGroup htmlFor="inputFile" label="Buscar Imagem: " >
                                    <input type="file"
                                        accept="image/*"

                                        onChange={handleImage}
                                        className="form-control"
                                        id="inputEditFile"
                                        aria-describedby="fileHelp"
                                        placeholder="Nova imagem do produto">
                                    </input>
                                </FormGroup>

                                <img src={fileFromUpload} alt="produto imagem from upload"></img>

                            </div>

                        </div>
                    </Dialog>

                </div>
            </Card>

        </main>

    )

}

export default CadastroProduto;