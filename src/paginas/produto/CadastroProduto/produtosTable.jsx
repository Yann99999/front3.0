import React from "react";
import { FiSettings, FiEdit2, FiX } from "react-icons/fi";

function ProdutosTable (props)  {

    const numberFormat = (value) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }
            //  new Intl.NumberFormat('en-US',  {style: 'currency',currency: 'USD'}
        ).format(value);

    const rows = props.produtos.map((produto, index) => {

        return (
            <tr key={index}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{numberFormat(produto.preco)}</td>
                <td>{produto.quantidade}</td>

                <td>{produto.categoria.nome}</td>
                <td>
                    <button className="btn-actions"
                        onClick={e => props.editAction(produto)}>
                        <FiEdit2 color="white" size={20}></FiEdit2>
                    </button>
                    <button className="btn-actions"
                        onClick={e => props.deleteAction(produto)}>
                        <FiX color="white" size={20}></FiX>
                    </button>

                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Descrição</th>
                    <th scope="col" style={{ width: '90px' }}>Preço</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">
                        <FiSettings color="white" size={18} className="icon-settings"></FiSettings>
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
export default ProdutosTable;