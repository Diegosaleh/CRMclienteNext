import React, { useContext, useState, useEffect } from "react";
import PedidoContext from '../../context/pedidos/PedidoContext';

const ProductoResumen = ({producto}) => {

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { cantidadProductos, actualizarTotal } = pedidoContext;

    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        actualizarCantidad();
        actualizarTotal();
    }, [cantidad]);

    const actualizarCantidad = () => {
        const nuevoProducto = {...producto, cantidad: Number( cantidad ) }
        cantidadProductos(nuevoProducto);
        
    }

    const { nombre, precio } = producto

    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md-mb-0">
                <p className="text-sm font-bold">{nombre}</p>
                <p className="font-bold">$ {precio}</p>

            </div>

            <input
                type="number"
                placeholder="Cantidad"
                className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-blue-600 md:ml-4"
                onChange={ e => setCantidad(e.target.value) }
                value={cantidad}
            />


        </div>
    );
};

export default ProductoResumen