import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const api = axios.create({
    baseURL: "https://real-estate-website-server-gamma.vercel.app/api"
})

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







    const getProperty = async (id) => {
        try {
            const reponse = await api.get(`/residency/${id}`, {
                timeout: 10 * 1000,
            });
            if (reponse.status === 400 || reponse.status === 500) {
                throw reponse.data
            }
            return reponse.data
        } catch (error) {
            toast.error("Something went wrong, refresh  and try again");
            throw error
        }

    }

    const createUser = async (email) => {
        try {
            withToken((token) =>
                api.post(
                    "/user/register",
                    { email },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            );

        } catch (error) {
            toast.error("something went wrong with registering, refresh  and try again")
            throw error
        }
    }

    const bookVisit = async (date, propertyId, email) => {
        try {
            withToken((token) =>
                api.post(
                    `/user/bookVisit/${propertyId}`,
                    {
                        email,
                        id: propertyId,
                        date: dayjs(date).format("DD/MM/YYYY"),
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            );
        } catch (error) {
            toast.error("something went wrong, please try again")
            throw error
        }
    }


    const removeBooking = async (id, email, token) => {
        try {
            withToken((token) =>
                api.post(
                    `/user/removeBooking/${id}`,
                    { email },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            );
        } catch (error) {
            toast.error("something went wrong, refresh and try again")
            throw error
        }
    }

    const toFav = async (id, email, token) => {
        try {
            withToken((token) =>
                api.post(
                    `/user/favourites/${id}`,
                    { email },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            );

        } catch (error) {
            toast.error("something went wrong, try again")
            throw error
        }
    }

    const getAllFav = async (email, token) => {
        if (!token) return
        try {
            withToken((token) =>
                api.post(
                    `/user/getFavourites`,
                    { email },
                    { headers: { Authorization: `Bearer ${token}` } }
                ).then((res) => res.data.favResidenciesID)
            );
        } catch (error) {
            //  toast.error("something went wrong, refresh  and try again")
            throw error
        }
    }


    const getAllBookings = async (email, token) => {
        if (!token) return
        try {
            withToken((token) =>
                api
                    .post(`/user/allBookings`, { email }, { headers: { Authorization: `Bearer ${token}` } })
                    .then((res) => res.data.bookedVisits)
            );
        } catch (error) {
            //   toast.error("something went wrong, try again")
            throw error
        }
    }
    const createResidency = async (data, token) => {
        if (!token) return
        try {
            withToken((token) =>
                api.post(
                    "/residency/create",
                    { data },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            );

        } catch (error) {
            toast.error("something went wrong, try again")
            throw error
        }
    }
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
}

export const getAllProperties = async () => {
    try {
        const reponse = await api.get("/residency/residencies", {
            timeout: 10 * 1000,
        });
        if (reponse.status === 400 || reponse.status === 500) {
            throw reponse.data
        }
        return reponse.data
    } catch (error) {
        //   toast.error("Something went wrong, refresh  and try again");
        throw error
    }

}
