import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import ProductsCards from '../Home/ProductsCards';
import { RxCross2 } from 'react-icons/rx';
import { scrollToTopOnRender } from '../../Utils';
import Pagination from '../Pagination/Pagination';
import ProductsList from './ProductsList';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';

const AllProducts = () => {

    const { setLoading } = useContext( UserContext );
    const [ products, setProducts ] = useState( null );
    const [ selected, setSelected ] = useState( 'Sort Products' );
    const [ page, setPage ] = useState( 1 );
    const [ productsCount, setProductsCount ] = useState( 0 );
    const [ cardView, setCardView ] = useState( true );
    const [ response, setResponse ] = useState( 'PENDING' );
    const searchRef = useRef();

    const handleSearch = ( e ) => {
        const string = searchRef.current.value;
        (
            async function () {
                try {
                    if ( string ) {
                        const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/search?page=${ page }&limit=20&string=${ encodeURIComponent( string ) }` );
                        const data = await response.json();
                        setProducts( data );
                    } else {
                        const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/filter?page=${ page }&sortby=${ encodeURIComponent( selected ) }&limit=20` );
                        const data = await response.json();
                        setProducts( data );
                    }
                }
                catch ( error ) {
                    console.log( error );
                }
            }
        )
            ();
    };

    const listItems = [
        "Sort by name A-Z",
        "Sort by name Z-A",
        "Price high to low",
        "Price low to high",
        "Sort by popularity",
    ];

    useEffect( () => {
        (
            async function () {
                setLoading( true );
                try {
                    const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/filter?page=${ page }&sortby=${ encodeURIComponent( selected ) }&limit=20` );
                    setResponse( response.statusText );
                    const data = await response.json();
                    setProducts( data );
                    setLoading( false );
                } catch ( error ) {
                    console.log( error );
                }
            }
        )();
    }, [ selected, page ] );

    useEffect( () => {
        scrollToTopOnRender();
    }, [ page ] );

    useEffect( () => {

        (
            async function () {
                setLoading( true );
                try {
                    const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/count` );
                    const data = await response.json();
                    setProductsCount( data.productsCount );
                    setLoading( false );
                }
                catch ( error ) {
                    console.log( error );
                }
            }
        )();

        scrollToTopOnRender();
    }, [] );


    return (
        <div className='mb-20 w-full'>
            <div className='grid grid-cols-5 lg:grid-cols-6 gap-4 items-center w-full py-4'>

                <h2 className='text-2xl col-span-2 lg:col-span-1'>All Toys</h2>

                <div className='flex col-span-5 lg:col-span-2 w-full'>
                    <div className="relative form-control flex-1">
                        <RxCross2
                            size={ 24 }
                            className={ `${ !searchRef?.current?.value && 'hidden' } absolute right-4 translate-y-1/2 cursor-pointer` }
                            onClick={ () => {
                                searchRef.current.value = '';
                                handleSearch();
                            }
                            } />
                        <input ref={ searchRef } onKeyUp={ handleSearch } type="text" placeholder="Search" className="input input-bordered hover:outline-none focus:outline-none" />
                    </div>
                </div>

                <div className='inline-flex items-center justify-center gap-2 text-sm lg:text-base col-span-4 lg:col-span-2 row-start-1 col-start-3 lg:col-start-4'>
                    <span onClick={ () => setCardView( false ) } className={ `${ cardView && 'opacity-30' } cursor-pointer` }>Tabuler View</span>
                    <Switch
                        checked={ cardView }
                        onChange={ setCardView }
                        className={ `bg-primary relative inline-flex items-center h-[20px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75` }
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={ `${ cardView ? 'translate-x-6' : 'translate-x-0' } pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out` }
                        />
                    </Switch>
                    <span onClick={ () => setCardView( true ) } className={ `${ !cardView && 'opacity-30' } cursor-pointer` }>Card View</span>
                </div>


                <Listbox value={ selected } onChange={ setSelected } className="z-20 col-span-5 lg:col-span-1">
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
                                { listItems.map( ( listItem, idx ) => (
                                    <Listbox.Option
                                        onClick={ () => { setSelected( listItem ); setPage( 1 ); } }
                                        key={ idx }
                                        className={ ( { active } ) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${ active ? 'bg-primary font-bold text-base-100 ' : 'text-gray-900'
                                            }`
                                        }
                                        value={ listItem }
                                    >
                                        { ( { selected } ) => (
                                            <>
                                                <span
                                                    className={ `block truncate ${ selected ? 'font-medium' : 'font-normal'
                                                        }` }
                                                >
                                                    { listItem }
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

            {
                cardView ?
                    <ProductsCards products={ products } entryAnimation="fade-up" response={ response } />
                    :
                    <ProductsList products={ products } entryAnimation="fade-up" response={ response } />
            }


            {
                products?.length === 0 && <h1 className='text-center text-4xl w-full my-10'>No Products Found</h1>
            }

            <Pagination page={ page } setPage={ setPage } pagesCount={ Math.ceil( ( productsCount && productsCount / 20 ) ) } />
        </div>
    );
};

export default AllProducts;