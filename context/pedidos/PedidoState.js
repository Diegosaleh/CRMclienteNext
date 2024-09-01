import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types'

const PedidoState = ({children}) => {

    //State de pedidos
    const InitialState = { 
        cliente: {},
        productos: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer( PedidoReducer, InitialState );
    
    //Modifica el cliente
    const agregarCliente = cliente => {
        // console.log(cliente);

        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }
    
    //Modifica los productos
    const agregarProducto = productosSeleccionados => {
        
        let nuevoState;
        if(state.productos.length > 0) {
            //Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id );
                return {...producto, ...nuevoObjeto}
            })
        } else {
            nuevoState = productosSeleccionados;
        }
        
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    //Modifica las cantidades de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })    
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL,
        })
        
    }

    return (
        <PedidoContext.Provider
            value={{
                productos: state.productos,
                cliente: state.cliente,
                agregarCliente,
                total: state.total,
                agregarProducto,
                cantidadProductos,
                actualizarTotal 
            }}
        > {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;