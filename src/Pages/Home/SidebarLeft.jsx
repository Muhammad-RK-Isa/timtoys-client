import { useContext, useState } from "react";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";

// This is a component that displays the sidebar on the left side of the home_page
const SidebarLeft = () => {

    const { setCategory, categories } = useContext( UserContext );
    const [ activeCategory, setActiveCategory ] = useState( null );

    const handleSetCategory = ( e ) => {
        const category = e.target.value;
        setCategory( category );
        setActiveCategory( category );
    };


    if ( categories ) {
        return (
            <div className="hidden md:flex flex-col md:ml-4 lg:ml-8 m-4">
                Shop By Category
                <div className="flex flex-col gap-4 mt-4 mr-2 w-full text-sm">
                    {
                        categories.map( ( { category, _id }, index ) => {
                            const id = category.split( ' ' ).join( '-' ).toLowerCase();
                            return (
                                <div key={ _id } className="flex items-center gap-2 py-2">
                                    <input
                                        id={ id }
                                        value={ category }
                                        type="radio"
                                        name="radio-category"
                                        checked={ activeCategory === category }
                                        className="radio"
                                        onClick={ handleSetCategory }
                                    />
                                    <label htmlFor={ id }>{ category }</label>
                                </div>
                            );
                        } )
                    }
                </div>
            </div>
        );
    }

};

export default SidebarLeft;