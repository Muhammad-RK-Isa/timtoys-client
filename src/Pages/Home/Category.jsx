import { Fragment, useContext, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { categories } from './categories';
import ProductsCards from './ProductsCards';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';


const Category = () => {

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
        <div className='lg:hidden mb-10'>
            <div className='grid grid-cols-5 gap-2 items-center w-full py-4'>

                <p className='col-span-2 text-sm font-semibold'>Sort By Category</p>

                <Listbox value={ selected } onChange={ setSelected } className="col-span-3 z-20">
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{ selected }</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={ Fragment }
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-neutral py-1 text-base shadow-lg focus:outline-none sm:text-sm">
                                { categories.map( ( category, idx ) => (
                                    <Listbox.Option
                                        onClick={ () => { setSelected( category ); } }
                                        key={ idx }
                                        className={ ( { active } ) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${ active ? 'bg-primary font-bold text-base-100 ' : 'text-gray-900'
                                            }`
                                        }
                                        value={ category }
                                    >
                                        { ( { selected } ) => (
                                            <>
                                                <span
                                                    className={ `block truncate ${ selected ? 'font-medium' : 'font-normal'
                                                        }` }
                                                >
                                                    { category }
                                                </span>
                                                { selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-success">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null }
                                            </>
                                        ) }
                                    </Listbox.Option>
                                ) ) }
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>

            </div>
            <ProductsCards products={ products } entryAnimation="zoom-in-up" response={ response } />
        </div>
    );
};

export default Category;