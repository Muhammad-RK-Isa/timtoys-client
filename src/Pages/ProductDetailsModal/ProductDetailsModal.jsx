import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { Rating } from "@material-tailwind/react";
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';



const ProductDetailsModal = () => {

    const { productForDetails, setProductForDetails, detailsModalOpen, setDetailsModalOpen, setLoading } = useContext( UserContext );
    const [ product, setProduct ] = useState( null );

    const closeModal = () => {
        setProductForDetails( null );
        setDetailsModalOpen( false );
    };

    useEffect( () => {
        if ( productForDetails ) {

            ( async function () {
                setLoading( true );
                try {
                    const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/product/${ productForDetails }` );
                    const data = await response.json();
                    setProduct( data );
                    setLoading( false );
                } catch ( error ) {
                    console.log( error );
                    setLoading( false );
                }
            }
            )();
        }
    }, [ productForDetails ] );

    if ( product ) {
        const { _id, title, thumbnailImage, price, listPrice, seller, category, description, reviewsCount, attributes, stars, features } = product;
        return (
            <Transition appear show={ detailsModalOpen } as={ Fragment }>
                <Dialog as="div" className="relative z-[10000000]" onClose={ closeModal }>
                    <Transition.Child
                        as={ Fragment }
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={ Fragment }
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full mx-2 max-w-2xl transform overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all">
                                    <div className='max-h-[85vh] overflow-y-scroll'>
                                        <div key={ _id } className="card rounded">
                                            <figure className='pt-4'>
                                                <img src={ thumbnailImage } alt="product-image" />
                                            </figure>
                                            <div className="card-body px-6 lg:p-8 text-base-100">
                                                <h2 className="card-title text-lg lg:text-xl">{ title }</h2>

                                                <div className='inline-flex items-end gap-2 w-max mt-1'>
                                                    <p className='text-4xl text-success font-bold'>{ '$' + price }</p>
                                                    <p className='text-xl text-base-200 opacity-30 line-through'>{ listPrice && '$' + listPrice }</p>
                                                    <p className='text-xl '>{ listPrice && + Math.ceil( price / listPrice * 100 - 100 ) + '%' }</p>
                                                </div>

                                                {/* Rating */ }
                                                <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
                                                    <div className='inline-flex gap-2 mt-1 w-max'>
                                                        <p className='text-xl flex items-center font-semibold'> { ( stars ? stars : 0 ) + '/' }<span className='opacity-40'>5</span></p>
                                                        <Rating value={ Math.floor( stars ) } readonly />
                                                    </div>
                                                    <p className='text-lg'>Total&nbsp;<span className="font-bold">{ reviewsCount && reviewsCount }</span>&nbsp;reviews.</p>
                                                </div>

                                                <hr className='border-none outline-none h-[1px] bg-base-200 bg-opacity-10 my-2 mt-4' />
                                                <p>Sold by&nbsp;<span className="font-bold">{ seller?.name }</span></p>
                                                <hr className='border-none outline-none h-[1px] bg-base-200 bg-opacity-10 my-2' />


                                                <div className='flex flex-col'>
                                                    <h2 className="font-bold text-lg lg:text-xl mt-4">About this product</h2>
                                                    <hr className='border-none outline-none h-[1px] bg-base-200 bg-opacity-10 my-2' />
                                                    {
                                                        features.length > 0 ?
                                                            <ul className='list-disc list-inside flex flex-col gap-4 mt-4'>
                                                                {
                                                                    features?.map( ( feature, index ) => {
                                                                        return (
                                                                            <li key={ index } className='list-item'>{ feature }</li>
                                                                        );
                                                                    } )
                                                                }
                                                            </ul>
                                                            :
                                                            "No information available for this product."
                                                    }
                                                </div>


                                                {/* Product Physical Description Tabular */ }
                                                <div className='flex flex-col'>
                                                    <h2 className="font-bold text-lg lg:text-xl mt-4">Product Details</h2>
                                                    <hr className='border-none outline-none h-[1px] bg-base-200 bg-opacity-10 my-2' />
                                                    { attributes.length > 0 ?
                                                        <table className='mt-4'>
                                                            {
                                                                attributes.map( ( attribute, index ) => {
                                                                    if ( attribute.value ) {
                                                                        return (
                                                                            <tr key={ index } className={ `${ index % 2 === 0 ? 'bg-base-200 bg-opacity-10' : 'bg-white' }` }>
                                                                                <td className='py-1'>
                                                                                    { attribute.key }
                                                                                </td>
                                                                                <td className='py-1'>
                                                                                    { attribute.value }
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                } )
                                                            }
                                                        </table>
                                                        :
                                                        "No information available for this product."
                                                    }

                                                </div>

                                                <h2 className="font-bold text-lg lg:text-xl mt-4">Description</h2>
                                                <hr className='border-none outline-none h-[1px] bg-base-200 bg-opacity-10 mb-2' />
                                                <p>{ description ? description : "No description available for this product." }</p>

                                                <div className="card-actions justify-end">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <RxCross2 size={ 32 } className='top-2 right-2 absolute cursor-pointer hover:text-error duration-150' onClick={ closeModal } />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        );
    };
};

export default ProductDetailsModal;