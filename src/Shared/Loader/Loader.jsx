import { useContext } from 'react';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import { Spinner } from "@material-tailwind/react";

const Loader = () => {

    const { loading } = useContext( UserContext );

    return (
        <div className={ `${ loading ? 'grid' : 'hidden'} fixed top-0 left-0 h-screen w-screen backdrop-blur-sm duration-150 place-content-center z-[10000000000]` }>
            <Spinner className="h-14 w-14" color="green" />
        </div>
    );
};

export default Loader;


