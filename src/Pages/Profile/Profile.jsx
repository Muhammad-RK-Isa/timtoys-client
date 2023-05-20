import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserContext } from './../../Providers/AuthProvider/AuthProvider';

const Profile = () => {

    const userdata = useLoaderData();
    const { user } = useContext( UserContext );

    if ( userdata && user ) {
        return (
            <section>

            </section>
        );
    }
};

export default Profile;