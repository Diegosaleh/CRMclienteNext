
import React from "react";
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
    query ObtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
        }
}`


const Header = () => {

    const router = useRouter();

    const { data, loading, error } = useQuery(OBTENER_USUARIO);
    
    // console.log(data)
    // console.log(loading)
    // console.log(error)

    //Proteger que no accedamos a data antes de obtener resultado
    if(loading) return 'Cargando...'

    //Si no hay información
    if(!data) {
        return router.push('/login')
    }

    const { nombre, apellido } = data.obtenerUsuario

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login')
    }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-5 lg:mb-0">Hola {nombre} {apellido}</p>

            <button
                onClick={()=> cerrarSesion()}
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >
                Cerra Sesión
            </button>
        </div>
    );
};

export default Header; 