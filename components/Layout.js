import React from 'react'
import Head from "next/head";
import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/router';
import '../styles/Home.module.css'


const Layout = ({children}) => {
    //Hook de routing
    const router = useRouter();
    Header

    return ( 
        <>
            <Head>
                <title>CRM Administración de clientes</title>
            </Head>

            {router.pathname === '/login' || router.pathname === '/nuevacuenta'  ? (
                <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
                    <div>
                        {children}
                    </div>
                </div>
            ) : (

            <div className='bg-gray-200 min-h-screen'>
                <div className='sm:flex min-h-screen'>
                    <Sidebar />
                    <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
                        <Header />
                        {children}
                    </main>
                </div>
            </div>

            )}
        
        </>
     );
}
 
export default Layout;