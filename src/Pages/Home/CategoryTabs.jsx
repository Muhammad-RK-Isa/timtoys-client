import { useContext, useEffect, useState } from 'react';
import { categories } from './categories';
import { Tab } from '@headlessui/react';
import ProductsCards from './ProductsCards';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';

function classNames ( ...classes ) {
    return classes.filter( Boolean ).join( ' ' );
}


const CategoryTabs = () => {
    const { setLoading } = useContext( UserContext );
    const [ products, setProducts ] = useState( null );
    const [ selected, setSelected ] = useState( categories[ 0 ] );
    const [ response, setResponse ] = useState( "PENDING" );

    useEffect( () => {
        (
            async function () {
                setLoading( true );
                try {
                    const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/filter_by_category?category=${ encodeURIComponent( selected ) }` );
                    setResponse( response.statusText );
                    const data = await response.json();
                    setProducts( data );
                    setLoading( false );
                } catch ( error ) {
                    console.log( error );
                    setLoading( false );
                }
            }
        )();
    }, [ selected ] );

    return (
        <div className="hidden lg:block w-full px-2 mt-16 mb-6 sm:px-0">
            <h2 className='text-2xl mb-4'>Sort By Category</h2>
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded bg-neutral p-1">
                    { categories.map( ( category ) => (
                        <Tab
                            key={ category }
                            onClick={ () => setSelected( category ) }
                            className={ ( { selected } ) =>
                                classNames(
                                    'w-full rounded py-2.5 text-sm font-medium leading-5 text-base-100 focus:outline-none',
                                    selected
                                        ? 'bg-primary shadow'
                                        : 'text-base-100 font-bold hover:bg-primary/[0.40] focus:outline-none'
                                )
                            }
                        >
                            { category }
                        </Tab>
                    ) ) }
                </Tab.List>
            </Tab.Group>
            {
                products &&
                <ProductsCards
                    products={ products }
                    entryAnimation="zoom-out-up"
                    response={response}
                />
            }
        </div>
    );
};


export default CategoryTabs;