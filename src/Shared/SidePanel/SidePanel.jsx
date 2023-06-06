import React, { useContext } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from '../../assets/svg/logo-transparent.svg';
import { Link } from "react-router-dom";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";

const SidePanel = () => {
    const { user, isToggled, setIsToggled, setActiveLink } = useContext( UserContext );

    const handleClick = ( page ) => {
        setActiveLink( page );
        setIsToggled( false );
    };
    return (
        <React.Fragment>
            <Drawer
                // overlay={ false }
                className="flex flex-col min-h-[130vh] z-[200000]"
                open={ isToggled }
                onClose={ () => setIsToggled( false ) }
            >
                <div className="mb-2 flex w-full items-center justify-between p-4">
                    <img src={ logo } alt="logo" className="w-max h-12" />
                    <IconButton variant="text" color="blue-gray" onClick={ () => setIsToggled( false ) }>
                        <XMarkIcon strokeWidth={ 2 } className="h-8 w-8" />
                    </IconButton>
                </div>
                <List>
                    <Link onClick={ () => handleClick( 'Home' ) } to='/'>
                        <ListItem>
                            Home
                        </ListItem>
                    </Link>
                    <Link onClick={ () => handleClick( 'All Products' ) } to='/products/all'>
                        <ListItem>
                            All Toys
                        </ListItem>
                    </Link>
                    <Link onClick={ () => handleClick( 'Add a Toy' ) } to="/user/products/add_product">
                        <ListItem>
                            Add A Toy
                        </ListItem>
                    </Link>
                    <Link onClick={ () => handleClick( 'My Toys' ) } to={ `/user/products/inventory` }>
                        <ListItem>
                            My Toys
                        </ListItem>
                    </Link>
                    <Link onClick={ () => handleClick( 'Blog' ) } to='/blog'>
                        <ListItem>
                            Blog
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </React.Fragment>
    );
};

export default SidePanel;
