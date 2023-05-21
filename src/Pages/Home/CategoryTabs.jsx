import { useContext, useEffect, Fragment, useState } from "react";
import { Listbox, Transition, Tab } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

const CategoryTabs = () => {

    const { subCategories, products, setCategory, categories, category } = useContext( UserContext );
    const [ selected, setSelected ] = useState( null );

    useEffect( () => {
        setCategory( 'Novelty & Gag Toys' );
        setSelected( 'Novelty & Gag Toys' );
    }, [] );

    useEffect(() => {
        setCategory( selected );
    }, [selected])
    

    function classNames ( ...classes ) {
        return classes.filter( Boolean ).join( ' ' );
    }

    if ( products && subCategories.length !== 0 && categories ) {
        return (
            <>
                <div className="md:hidden w-full z-50">
                    <p className="text-lg font-semibold text-accent py-4">Sort By Category and sub-category</p>
                    <Listbox value={ selected } onChange={ setSelected }>
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
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                                    { categories.map( ( { category, _id } ) => (
                                        <Listbox.Option
                                            key={ _id }
                                            className={ ( { active } ) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 z-50 ${ active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
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
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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

                <div className="w-full px-2 pt-4 pb-16 sm:px-0 z-0">
                    <Tab.Group>
                        <Tab.List className="grid grid-cols-2 md:flex space-x-1 rounded bg-neutral p-1">
                            { subCategories.map( ( subCategory ) => (
                                <Tab
                                    key={ subCategory }
                                    className={ ( { selected } ) =>
                                        classNames(
                                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-primary text-opacity-60 hover:bg-white/[0.60] focus:outline-none'
                                        )
                                    }
                                >
                                    { subCategory }
                                </Tab>
                            ) ) }
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            { subCategories.map( ( subCat, idx ) => (
                                <Tab.Panel
                                    key={ idx }
                                    className={ classNames(
                                        'rounded-xl bg-white p-3',
                                    ) }
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {
                                            products.map( ( { subCategory, title, thumbnailImage, price, listPrice, _id } ) => {
                                                if ( subCat === subCategory ) {
                                                    return (
                                                        <Link key={ _id } to={ `/product/${ _id }` } className="card card-compact w-44 h-52 md:h-72 md:w-72 mx-auto md:mx-0 bg-base-100 shadow-sm border rounded-md">
                                                            <figure className="z-0">
                                                                <img src={ thumbnailImage } alt="Shoes" />
                                                            </figure>
                                                            <div className="card-body">
                                                                <h2 className="card-title text-base line-clamp-2 md:line-clamp-3">{ title }</h2>
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center justify-between md:justify-normal gap-2 w-full md:w-max">
                                                                        <p className="font-bold text-xl md:text-2xl">{ `$` + price.value }</p>
                                                                        {
                                                                            listPrice?.value &&
                                                                            <p className="font-bold text link-error line-through">{ `$` + listPrice.value }</p>
                                                                        }
                                                                    </div>
                                                                    <button className="btn btn-xs btn-primary gap-2 rounded-md hidden md:inline-flex">
                                                                        More Info
                                                                        <BiRightArrowAlt />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            } )
                                        }
                                    </div>
                                </Tab.Panel>
                            ) ) }
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </>
        );
    };
};


export default CategoryTabs;