import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import ProductsCards from './ProductsCards';

const Home_products = () => {

    const [ products, setProducts ] = useState( null );
    const [ response, setResponse ] = useState( 'PENDING' );

    useEffect( () => {
        (
            async function () {
                try {
                    const response = await fetch( `${import.meta.env.VITE_SERVERADDR}/products/get_by_quantity?quantity=10` );
                    setResponse( response.statusText );
                    const data = await response.json();
                    setProducts( data );
                } catch ( error ) {
                    console.log( error );
                }
            }
        )();
    }, [] );
    if ( products ) {
        return (
            <div className='flex flex-col'>
                <ProductsCards products={ products } entryAnimation="fade-up" response={ response } />
                <Link to="/products/all" className='self-end w-max mt-4 mb-8'>
                    <Button variant="text" size={ 'lg' } className="flex items-center gap-2 hover:bg-primary hover:text-white hover:bg-opacity-30 text-primary">
                        See More <ArrowLongRightIcon strokeWidth={ 2 } className="h-5 w-5" />
                    </Button>
                </Link>
            </div>
        );
    }

};

export default Home_products;