import { Fragment, useContext, useRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { categories } from "../Home/categories";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const AddProduct = () => {

    const formRef = useRef();
    const featuresRef = useRef();
    const [ selected, setSelected ] = useState( categories[ 0 ] );
    const [ confirmationModalOpen, setConfirmationModalOpen ] = useState( false );
    const { user, setLoading } = useContext( UserContext );
    const [ newProduct, setNewProduct ] = useState( null );

    const addFeatureField = () => {
        const newField =
            `<div class="form-control">
                <input
                    name="features"
                    type="text"
                    class="input input-bordered w-full rounded"
                />
            </div>`;
        featuresRef.current.insertAdjacentHTML( 'beforeend', newField );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        setConfirmationModalOpen( true );
        const title = e.target.title.value;
        const description = e.target.description.value;
        const price = e.target.salePrice.value;
        const listPrice = e.target.mrp.value;
        const sellerName = e.target.sellerName.value;
        const email = e.target.email.value;
        const quantity = e.target.quantity.value;
        const brand = e.target.brand.value;

        const formDataImage = new FormData();
        formDataImage.append( 'key', `${ import.meta.env.VITE_IMAGEBB_API }` );
        formDataImage.append( 'image', formRef.current.picture.files[ 0 ] );

        // ? Retrieve the features
        const featuresElements = document.getElementsByName( 'features' );
        const features = [];
        featuresElements.forEach( ( element ) => {
            if ( element.value ) {
                features.push( element.value );
            }
        } );

        // ? Retrieve the attributes

        const attributes = [];

        const dimension = {
            key: 'Product Dimension',
            value: document.getElementById( 'dimension' ).value
        };
        const weight = {
            key: 'Item Weight',
            value: document.getElementById( 'weight' ).value
        };
        const origin = {
            key: 'Country of Origin',
            value: document.getElementById( 'origin' ).value
        };
        const modelNumber = {
            key: 'Model Number',
            value: document.getElementById( 'modelNumber' ).value
        };

        attributes.push( dimension );
        attributes.push( weight );

        if ( origin ) {
            attributes.push( origin );
        }

        if ( modelNumber ) {
            attributes.push( modelNumber );
        }

        attributes.push();

        Swal.fire( {
            title: 'Do you want to publish this toy?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-success mr-2 rounded',
                cancelButton: 'btn btn-error text-white rounded',
            },
        } ).then( ( result ) => {
            /* Read more about isConfirmed, isDenied below */
            if ( result.isConfirmed ) {
                (
                    async () => {
                        setLoading( true );
                        try {
                            const response = await fetch( 'https://api.imgbb.com/1/upload', {
                                method: 'POST',
                                body: formDataImage
                            } );
                            const data = await response.json();
                            const thumbnailImage = data.data.url;

                            // ! Create a new product object
                            const newProduct = {
                                title,
                                price,
                                listPrice,
                                thumbnailImage,
                                features,
                                attributes,
                                description,
                                brand,
                                quantity,
                                category: selected,
                                seller: {
                                    name: sellerName,
                                    email,
                                    id: user.uid
                                }
                            };

                            setNewProduct( newProduct );
                            
                            const serverResponse = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/add_product`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `Bearer ${ localStorage.getItem( 'jwt-access-token' ) }`
                                },
                                body: JSON.stringify( newProduct )
                            } );
                            const serverResponseData = await serverResponse.json();
                            console.log( serverResponseData );
                            setLoading( false );

                            if ( serverResponseData.acknowledged ) {
                                Swal.fire( 'Published!', '', 'success' );
                            } else {
                                Swal.fire( 'This toy already exists!', '', 'error' );
                            }

                        } catch ( error ) {
                            console.log( error );
                        }
                    }
                )();
            } else if ( result.isDenied ) {
                Swal.fire( 'Your toy was not published!', '', 'info' );
            }
        } );
    };

    return (
        <section>
            <h2 className="text-4xl font-bold py-6 text-center box-content">Add A Toy</h2>

            <form
                ref={ formRef }
                onSubmit={ handleSubmit }
                class="flex flex-col lg:grid lg:grid-cols-2 gap-4 max-w-4xl mx-auto mb-20"
            >

                {/* Product Details */ }
                <h3 class="text-2xl font-bold lg:col-span-2 mt-8 text-primary">Product Details</h3>
                <div className="form-control col-span-2">
                    <label class="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        name='title'
                        type="text"
                        class="input input-bordered w-full rounded"
                        required
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Brand</span>
                    </label>
                    <input
                        name="brand"
                        type="text"
                        class="input input-bordered w-full rounded"
                        required
                    />
                </div>

                {/* Product Image */ }
                <div class="form-control">
                    <label class="label">
                        <span class="label-text w-full">Pick a picture<span className='text-error bg-transparent'>*</span></span>
                    </label>
                    <input
                        name="picture"
                        type="file"
                        class="file-input file-input-bordered rounded w-full"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 lg:col-span-2">
                    <div class="form-control relative">
                        <label class="label">
                            <span class="label-text">MRP</span>
                        </label>
                        <span class="absolute top-12 left-2 flex items-center pl-2">
                            $
                        </span>
                        <input
                            name="mrp"
                            type="number"
                            class="input input-bordered w-full pl-8 box-border rounded"
                            required
                        />
                    </div>

                    <div class="form-contro relative">
                        <span class="absolute top-12 left-2 flex items-center pl-2">
                            $
                        </span>
                        <label class="label">
                            <span class="label-text">Sale Price</span>
                        </label>
                        <input
                            name="salePrice"
                            type="number"
                            class="input input-bordered w-full pl-8 box-border rounded"
                            required
                        />
                    </div>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Available Quantity</span>
                    </label>
                    <input
                        name="quantity"
                        type="number"
                        class="input input-bordered w-full rounded"
                        min="1"
                        pattern="^(?:[1-9]\d{0,2}|1000)$"
                        required
                    />
                </div>

                <div className='form-control'>
                    <label class="label">
                        <span class="label-text">Select a category</span>
                    </label>
                    <Listbox value={ selected } onChange={ setSelected } className="z-20">
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate text-base-200">{ selected }</span>
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


                <div className='lg:col-span-2 w-full flex flex-col gap-4 my-6'>
                    <div className="form-control">
                        <label className="input-group grid grid-cols-3">
                            <span className='w-full bg-primary text-base-200 !rounded-l'>Product Dimensions<span className='text-error bg-transparent -ml-4'>*</span></span>
                            <input id='dimension' type="text" placeholder="E.g. 3 x 4 x 5 cm" className="col-span-2 input input-bordered w-full !rounded-r" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-group grid grid-cols-3">
                            <span className='w-full bg-primary text-base-200 !rounded-l'>Product Weight<span className='text-error bg-transparent -ml-4'>*</span></span>
                            <input id='weight' type="text" placeholder="E.g. 2 KG" className="col-span-2 input input-bordered w-full !rounded-r" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-group grid grid-cols-3">
                            <span className='w-full bg-primary text-base-200 !rounded-l'>Country of Origin</span>
                            <input id='origin' type="text" placeholder="E.g. Made in Japan" className="col-span-2 input input-bordered w-full !rounded-r" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-group grid grid-cols-3">
                            <span className='w-full bg-primary text-base-200 !rounded-l'>Model Number</span>
                            <input id='modelNumber' type="text" placeholder="E.g. JP-HCNXM2023" className="col-span-2 input input-bordered w-full !rounded-r" />
                        </label>
                    </div>
                </div>


                {/* Features */ }
                <div className='flex flex-col gap-4 my-6 col-span-2'>
                    <h3 class="text-2xl font-bold col-span-2 mt-8 text-primary">Features</h3>
                    <div className='flex flex-col gap-4' ref={ featuresRef }>
                        <div class="form-control">
                            <input
                                name="features"
                                type="text"
                                placeholder="E.g. Rechargable: This toy can be recharged and will last a whole day after being fully charged."
                                class="input input-bordered w-full rounded"
                            />
                        </div>
                    </div>

                    <button type='button' onClick={ addFeatureField } className='btn btn-secondary w-max self-end inline-flex gap-2 items-center'><AiOutlinePlusSquare size={ 20 } /> Add another field</button>
                </div>


                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text">Description (Recommended)</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24 rounded font-semibold"
                        name='description'
                    />
                </div>


                {/* Seller Details */ }
                <h3 class="text-2xl font-bold col-span-2 mt-8 text-primary">Seller Details</h3>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input
                        name="sellerName"
                        type="text"
                        class="input input-bordered w-full"
                        defaultValue={ user?.displayName }
                    />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={ user?.email && user.email }
                        placeholder='example@email.com'
                        class="input input-bordered w-full" />
                </div>

                <button type='submit' className="btn btn-success rounded lg:col-span-2 mt-4 w-full">Publish Toy</button>
            </form>
        </section>
    );
};

export default AddProduct;