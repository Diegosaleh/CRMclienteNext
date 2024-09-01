import React, { useState, useEffect } from "react";
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const ACTUALIZAR_PEDIDO = gql`
    mutation ActualizarPedido($id: ID!, $input: PedidoInput) {
        actualizarPedido(id: $id, input: $input) {
            estado
        }
    }
`;

const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id: ID!) {
        eliminarPedido(id: $id)
    }
`;

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
    }
  }
`;



const Pedido = ({ pedido }) => {

    const { id, total, cliente: { nombre, apellido, telefono, email }, estado, cliente } = pedido;

    const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
    const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
        update(cache) {
            const { obtenerPedidosVendedor } = cache.readQuery({ query: OBTENER_PEDIDOS });
            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data: {
                    obtenerPedidosVendedor: obtenerPedidosVendedor.filter(pedido => pedido.id !== id)
                }
            })
        }
    });

    const [estadoPedido, setEstadoPedido] = useState(estado);
    const [clase, setClase] = useState('');

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido);
        }
        clasePedido();
    }, [estadoPedido]);

    const clasePedido = () => {
        if (estadoPedido === 'PENDIENTE') {
            setClase('border-yellow-500');
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('border-green-500');
        } else {
            setClase('border-red-800');
        }
    };

    const cambiarEstadoPedido = async nuevoEstado => {
        try {
            const { data } = await actualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            });
            setEstadoPedido(data.actualizarPedido.estado);
        } catch (error) {
            console.log(error);
        }
    };

    const confirmarElimarPedido = async () => {
        Swal.fire({
            title: '¿Deseas eliminar este pedido?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    const data = await eliminarPedido({
                        variables: {
                        id
                        }
                    });
                    Swal.fire(
                        'Eliminado!',
                        `El pedido del cliente ${cliente.nombre} ha sido eliminado`,
                        'success',
                        'El pedido ha sido eliminado',
                        data.eliminarPedido,
                        
                    );
                } catch (error) {
                    console.log(error)
                }
                
            }
        })
    };
    

    return (
        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 drop-shadow-md hover:drop-shadow-xl`}>
            <div>
                <p className="font-bold text-gray-800">Cliente: {nombre} {apellido}</p>

                {email && (
                    <p className="flex items-center my-2">
                        <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path>
                        </svg>
                        {email}
                    </p>
                )}

                {telefono && (
                    <p className="flex items-center my-2">
                        <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"></path>
                        </svg>
                        {telefono}
                    </p>
                )}

                <h2 className="text-gray-800 font-bold mt-10">Estado Pedido: {estado}</h2>

                <select
                    className="form-select mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-3 text-center rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase text-sm font-bold shadow-md"
                    value={estadoPedido}
                    onChange={e => cambiarEstadoPedido(e.target.value)}
                >
                    <option className="bg-blue-500 hover:bg-blue-400" value="COMPLETADO">COMPLETADO</option>
                    <option className="bg-blue-500 hover:bg-blue-400" value="PENDIENTE">PENDIENTE</option>
                    <option className="bg-blue-500 hover:bg-blue-400" value="CANCELADO">CANCELADO</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
                {pedido.pedido.map(articulo => (
                    <div key={articulo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">Total a pagar:
                    <span className="font-light"> $ {total} </span>
                </p>

                <button
                    className="uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
                    onClick={() => confirmarElimarPedido(id) }
                >
                    Eliminar Pedido
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" strokeWidth={1} className="size-5 ml-2">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Pedido;