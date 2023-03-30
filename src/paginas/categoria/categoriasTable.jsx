import React from "react";
import { FiSettings, FiEdit2, FiX } from "react-icons/fi";

function CategoriasTable (props)
 {

    const rows = props.categorias.map((categoria,index) => {

        return (
            <tr key={index}>
                <td>{categoria.nome}</td>
            
                <td>
                    <button className="btn-actions"
                        onClick={e => props.editAction(categoria)}>
                            <FiEdit2 color="white" size={20}></FiEdit2>
                        </button>
                    <button className="btn-actions"
                        onClick={e => props.deleteAction(categoria)}>
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
export default CategoriasTable;