import { useEffect, useContext } from 'react';
import { useApi } from '../utils/api';
import UserDetailContext from '../context/UserDetailContext';
import { toast } from 'react-toastify';

const useBookings = () => {
    const { getAllBookings } = useApi();
    const { userDetails: { email, bookings }, setUserDetails } = useContext(UserDetailContext);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!email) return; // Wait for user email
            try {
                const allBookings = await getAllBookings(email);
                setUserDetails(prev => ({ ...prev, bookings: allBookings }));
            } catch (err) {
                toast.error("Failed to load bookings");
                console.error(err);
            }
        };

        fetchBookings();
    }, [email, getAllBookings, setUserDetails]);

    return bookings;
};

export default useBookings;
