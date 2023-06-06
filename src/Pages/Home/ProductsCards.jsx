import { Button } from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import LazyLoader from "../LazyLoader/LazyLoader";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from 'react-icons/ri';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const ProductsCards = ( { products, entryAnimation, response, editable } ) => {

    const { user, setDetailsModalOpen, setProductForDetails } = useContext( UserContext );

    const handleDetailsModal = ( _id ) => {
        if ( user ) {
            setDetailsModalOpen( true );
            setProductForDetails( _id );
        } else {
            toast.error( 'Please login to view details' );
        }
    };

    const handleDeleteProduct = async ( _id ) => {
        Swal.fire( {
            title: 'Are you sure you want to delete this product?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-error text-white rounded mr-2',
                cancelButton: 'btn btn-ghost rounded',
            },
        } )
            .then( ( result ) => {
                if ( result.isConfirmed ) {
                    (
                        async () => {
                            try {
                                const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/product/${ _id }`, {
                                    method: 'DELETE',
                                    authorization: `Bearer ${ localStorage.getItem( 'jwt-access-token' ) }`
                                } );

                                if ( response.ok ) {
                                    Swal.fire( 'Deleted!', '', 'success' );
                                    setTimeout( () => {
                                        window.location.reload();
                                    }, 500 );
                                } else {
                                    Swal.fire( 'Something went wrong!', '', 'error' );
                                }
                            }
                            catch ( error ) {
                                console.log( error );
                            }
                        }
                    )();
                };
            } );
    };

    useEffect( () => {
        AOS.init();
    }, [] );

    return (
        <>
            <div className={ `${ response === 'PENDING' ? 'block' : 'hidden' }` }>
                <LazyLoader />
            </div>

            <div className={ `grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 lg:mt-6` }>
                {
                    products?.map( ( { _id, title, thumbnailImage, price, stars } ) => {
                        return (
                            <div data-aos={ entryAnimation } key={ _id } className='grid grid-rows-5 lg:grid-rows-2 h-60 lg:h-[20rem] rounded bg-neutral bg-opacity-90 text-base-100 p-2 md:p-3 lg:p-4'>
                                <figure className='row-span-2 lg:row-span-1 rounded overflow-hidden drop-shadow-lg w-full'>
                                    <img
                                        src={ thumbnailImage }
                                        alt="product-image"
                                        className='object-cover object-center'
                                    />
                                </figure>
                                <div className='mt-4 row-span-3 lg:row-span-1 flex flex-col'>
                                    <h3 className='line-clamp-2 mb-2 font-semibold w-[10.5rem] lg:w-52 break-words'>{ title }</h3>
                                    <div className='inline-flex items-center justify-between w-full mb-auto'>
                                        <p className='font-semibold mb-1'>{ '$' + price }</p>
                                        {
                                            <p className='inline-flex items-center w-max text-sm'>
                                                <AiFillStar className='text-warning' />
                                                { stars ? stars : 0 }
                                            </p>
                                        }
                                    </div>
                                    <div className={ `${ editable && 'grid grid-cols-4 lg:grid-cols-5' } w-full justify-end gap-1` }>
                                        <Button
                                            size={ 'sm' }
                                            onClick={ () => handleDetailsModal( _id ) }
                                            className={ `${ editable && 'col-span-2 lg:col-span-3 py-1 lg:py-2' } bg-primary shadow-none hover:shadow-primary w-full rounded` }
                                        >
                                            More Details
                                        </Button>
                                        <Link
                                            to={ `/user/product/update/${ _id }` }
                                        >
                                            <Button
                                                size={ 'sm' }
                                                color='blue-gray'
                                                className={ `${ editable ? 'grid' : 'hidden' } h-full w-full rounded place-content-center` }
                                            >
                                                <FiEdit />
                                            </Button>
                                        </Link>
                                        <Button
                                            size={ 'sm' }
                                            color='red'
                                            onClick={ () => handleDeleteProduct( _id ) }
                                            className={ `${ editable ? 'grid' : 'hidden' } w-full rounded place-content-center` }
                                        >
                                            <RiDeleteBin5Line />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    } )
                }
            </div>
        </>
    );
};

export default ProductsCards;