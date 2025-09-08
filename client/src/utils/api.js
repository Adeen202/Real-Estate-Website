import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

// Axios instance
export const api = axios.create({
    baseURL: "https://real-estate-website-two-gamma.vercel.app/api",
    timeout: 10000, // 10 seconds
});

// Custom hook for API calls
export const useApi = () => {
    const { getAccessTokenSilently } = useAuth0();

    // Utility to get token and call API
    const withToken = async (callback) => {
        try {
            const token = await getAccessTokenSilently({
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            });
            return await callback(token);
        } catch (err) {
            toast.error("Authentication failed, please login again");
            throw err;
        }
    };

    // Public API call: get property by ID
    const getProperty = async (id) => {
        try {
            const response = await api.get(`/residency/${id}`);
            return response.data;
        } catch (error) {
            toast.error("Something went wrong, refresh and try again");
            throw error;
        }
    };

    // Authenticated API calls
    const createUser = async (email) => {
        return withToken((token) =>
            api.post("/user/register", { email }, { headers: { Authorization: `Bearer ${token}` } })
        );
    };

    const bookVisit = async (date, propertyId, email) => {
        return withToken((token) =>
            api.post(
                `/user/bookVisit/${propertyId}`,
                { email, id: propertyId, date: dayjs(date).format("DD/MM/YYYY") },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        );
    };

    const removeBooking = async (id, email) => {
        return withToken((token) =>
            api.post(
                `/user/removeBooking/${id}`,
                { email },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        );
    };

    const toFav = async (id, email) => {
        return withToken((token) =>
            api.post(
                `/user/favourites/${id}`,
                { email },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        );
    };

    const getAllFav = async (email) => {
        return withToken((token) =>
            api
                .post(`/user/getFavourites`, { email }, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => res.data.favResidenciesID)
        );
    };

    const getAllBookings = async (email) => {
        return withToken((token) =>
            api
                .post(`/user/allBookings`, { email }, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => res.data.bookedVisits)
        );
    };

    const createResidency = async (data) => {
        return withToken((token) =>
            api.post("/residency/create", { data }, { headers: { Authorization: `Bearer ${token}` } })
        );
    };

    return {
        getProperty,
        createUser,
        bookVisit,
        removeBooking,
        toFav,
        getAllFav,
        getAllBookings,
        createResidency,
    };
};

// Public API call: get all properties (no Auth0 required)
export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/residencies");
        return response.data;
    } catch (error) {
        throw error;
    }
};
