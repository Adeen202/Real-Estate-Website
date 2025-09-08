import { useEffect, useContext } from 'react';
import { useApi } from '../utils/api';
import UserDetailContext from '../context/UserDetailContext';
import { toast } from 'react-toastify';

const useFavourites = () => {
    const { getAllFav } = useApi();
    const { userDetails: { token, email, favourites }, setUserDetails } = useContext(UserDetailContext);

    useEffect(() => {
        const fetchFavourites = async () => {
            if (!email) return; // Wait for user email
            try {
                const favIDs = await getAllFav(email);
                setUserDetails(prev => ({ ...prev, favourites: favIDs }));
            } catch (err) {
                toast.error("Failed to load favourites");
                console.error(err);
            }
        };

        fetchFavourites();
    }, [email, getAllFav, setUserDetails]);

    return favourites;
};

export default useFavourites;
