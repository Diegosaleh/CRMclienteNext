import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
  query ObtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`
const AsignarProducto = () => {

    //State local del componente

    const [ productos, setProductos]  = useState([]);

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarProducto } = pedidoContext;

    useEffect(() => {
      //TODO para pasar a PedidoState.js
      agregarProducto(productos) 
    }, [productos])

    //Consulta a la base de datos

    const  {data, loading, error} = useQuery(OBTENER_PRODUCTOS);
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    const seleccionarProducto = producto => {
      setProductos(producto)
    }

    if (loading) return 'Cargando...'
    const { obtenerProductos } = data;


    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Selecciona o busca los productos</p>
            <Select
            className="mt-3"
            options={ obtenerProductos }
            onChange={ opcion => seleccionarProducto(opcion) }
            isMulti={true}
            getOptionValue={ opciones => opciones.id }
            getOptionLabel={ opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles` }
            placeholder="Busque o Seleccione el Producto"
            noOptionsMessage={ () => "No hay resultados"}
            />
        </>
    );
}

export default AsignarProducto