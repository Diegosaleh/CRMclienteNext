import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router'

const ELIMINAR_CLIENTE = gql`
    mutation EliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
    }
`;

const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientesVendedor {
      obtenerClientesVendedor {
        id
        nombre
        apellido
        empresa
        email
      }
    }
`;

const Clientes = ({cliente}) => {

    //mutation para eliminar cliente
    const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
        update(cache){
            //Obtener una copia del objeto del cache
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO});

            //Reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter( clienteActual => clienteActual.id !== id )
                }
            })
        }
    })

    const {nombre, apellido, empresa, email, id} = cliente

     const confirmarEliminarCliente = () => {
        Swal.fire({
            title: `¿Deseas eliminar a ${cliente.nombre} ${cliente.apellido}?`  ,
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "No, Cancelar"
          }).then( async (result) => {
            if (result.isConfirmed) {

                try {
                    //Eliminar por ID
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });
                    console.log(data)

                    //Mostrar un alerta

                    Swal.fire({
                        title: "Eliminado!",
                        text: data.eliminarCliente,
                        icon: "success"
                      });
                } catch (error) {
                    console.log(error);
                }
            }
          });
     }

     const editarCliente = () => {
        Router.push({
            pathname: "/editarcliente/[id]", 
            query: { id }
        })
     }

    return (
        <tr>
            <td className="border px-4 py-2">{nombre} {apellido} </td>
            <td className="border px-4 py-2 text-center">{empresa}</td>
            <td className="border px-4 py-2 text-center">{email}</td>
            <td className="border px-4 py-2">
                <button     
                    type="button"
                    className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={()=> confirmarEliminarCliente() }
                >
                    Eliminar

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button     
                    type="button"
                    className='flex justify-center items-center bg-emerald-500 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={()=> editarCliente() }
                >
                    Editar

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                </button>
            </td>
        </tr>
    );
}

export default Clientes;
