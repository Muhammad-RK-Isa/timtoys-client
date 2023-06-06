import React, { useContext, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const TABLE_HEAD = [ "Title", "Price", "Available Quantity", "Category", "Seller", "" ];

const ProductsList = ( { products, entryAnimation, editable } ) => {

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
        <div>
            <Card className="hidden lg:block overflow-scroll h-full w-full rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            { TABLE_HEAD.map( ( head ) => (
                                <th key={ head } className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        { head }
                                    </Typography>
                                </th>
                            ) ) }
                        </tr>
                    </thead>
                    <tbody>
                        { products?.map( ( { title, price, quantity, category, seller, _id } ) => (
                            <tr data-aos={ `${ entryAnimation && entryAnimation }` } key={ _id } className="even:bg-blue-gray-50/50">
                                <td className="p-4 max-w-sm">
                                    <Typography variant="small" color="blue-gray" className="font-normal break-words">
                                        { title }
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        { "$" + price }
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal text-center">
                                        { quantity }
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        { category }
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        { seller.name }
                                    </Typography>
                                </td>
                                <td className="px-2 py-4 inline-flex gap-3">
                                    <button onClick={ () => handleDetailsModal( _id ) }>
                                        <Typography variant="small" color="blue" className="font-medium">
                                            Details
                                        </Typography>
                                    </button>
                                    <Link
                                        to={ `/user/product/update/${ _id }` }
                                        className={ `${ editable ? 'block' : 'hidden' }` }
                                    >
                                        <Typography variant="small" color="gray" className="font-medium">
                                            Update
                                        </Typography>
                                    </Link>
                                    <button
                                        onClick={ () => handleDeleteProduct( _id ) }
                                        className={ `${ editable ? 'block' : 'hidden' }` }
                                    >
                                        <Typography variant="small" color="red" className="font-medium">
                                            Delete
                                        </Typography>
                                    </button>
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </Card>

            {
                products?.map( ( { title, price, quantity, category, seller, _id } ) => (
                    <div key={ _id } data-aos={ `${ entryAnimation && entryAnimation }` } className='lg:hidden mb-2 text-base-100 bg-white overflow-hidden rounded grid gap-2'>
                        <div className='grid grid-cols-2 bg-gray-200 py-1 pt-4 px-2'>
                            <div>
                                {
                                    TABLE_HEAD[ 0 ]
                                }
                            </div>
                            <div className='line-clamp-3'>
                                { title }
                            </div>
                        </div>

                        <div className='grid grid-cols-2 bg-neutral py-1 px-2'>
                            <div>
                                {
                                    TABLE_HEAD[ 1 ]
                                }
                            </div>
                            <div>
                                { '$' + price }
                            </div>
                        </div>

                        <div className='grid grid-cols-2 bg-gray-200 py-1 px-2'>
                            <div>
                                {
                                    TABLE_HEAD[ 2 ]
                                }
                            </div>
                            <div>
                                { quantity }
                            </div>
                        </div>

                        <div className='grid grid-cols-2 bg-white py-1 px-2'>
                            <div>
                                {
                                    TABLE_HEAD[ 3 ]
                                }
                            </div>
                            <div>
                                { category }
                            </div>
                        </div>

                        <div className='grid grid-cols-2 bg-gray-200 py-1 px-2'>
                            <div>
                                {
                                    TABLE_HEAD[ 4 ]
                                }
                            </div>
                            <div>
                                { seller.name }
                            </div>
                        </div>
                        <div className='grid grid-cols-2 bg-white py-1 pb-4 px-2'>
                            <div>
                                More Details
                            </div>
                            <div className='inline-flex gap-4'>
                                <button onClick={ () => handleDetailsModal( _id ) }>
                                    <Typography variant="small" color="blue" className="font-medium">
                                        Details
                                    </Typography>
                                </button>
                                <Link
                                    to={ `/user/product/update/${ _id }` }
                                    className={ `${ editable ? 'block' : 'hidden' }` }
                                >
                                    <Typography variant="small" color="gray" className="font-medium">
                                        Update
                                    </Typography>
                                </Link>
                                <button
                                    onClick={ () => handleDeleteProduct( _id ) }
                                    className={ `${ editable ? 'block' : 'hidden' }` }
                                >
                                    <Typography variant="small" color="red" className="font-medium">
                                        Delete
                                    </Typography>
                                </button>
                            </div>
                        </div>
                    </div>
                ) )
            }
        </div>
    );
};

export default ProductsList;