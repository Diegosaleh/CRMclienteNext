import Link from 'next/link';
import { useRouter } from 'next/router'

const Sidebar = () => {
    // Routing de next
    const router = useRouter();


    return ( 
        <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                <p className='text-white text-2xl font-black'>CRM Clientes</p>
            </div>

            <nav className='mt-5 list-none'>
                <li className={router.pathname === '/'|| router.pathname === '/nuevocliente'  ? "bg-blue-800 p-2" : "p-2"}>
                    <Link legacyBehavior href='/'>
                        <a className='text-white block'>
                            Clientes
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/pedidos' || router.pathname === '/nuevopedido' ? "bg-blue-800 p-2" : "p-2"}>
                <Link legacyBehavior href='/pedidos'>
                        <a className='text-white block'>
                            Pedidos
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/productos' || router.pathname === '/nuevoproducto'  ? "bg-blue-800 p-2" : "p-2"}>
                <Link legacyBehavior href='/productos'>
                        <a className='text-white block'>
                            Productos
                        </a>
                </Link>
                </li>
            </nav>

            <div className='sm:mt-10'>
                <p className='text-white text-2xl font-black'>Otras Opciones</p>
            </div>

            <nav className='mt-5 list-none'>

                <li className={router.pathname === '/mejoresvendedores'  ? "bg-blue-800 p-2" : "p-2"}>
                    <Link legacyBehavior href='/mejoresvendedores'>
                        <a className='text-white block'>
                            Mejores Vendedores
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/mejoresclientes'  ? "bg-blue-800 p-2" : "p-2"}>
                    <Link legacyBehavior href='/mejoresclientes'>
                        <a className='text-white block'>
                            Mejores Clientes
                        </a>
                    </Link>
                </li>

            </nav>

        </aside>
     );
}
 
export default Sidebar;