import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const api = axios.create({
    baseURL: "https://real-estate-website-sigma-roan.vercel.app/api"
})

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

export const getProperty = async (id) => {
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

export const createUser = async (email, token) => {
    try {
        await api.post(`/user/register`, { email }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    } catch (error) {
        toast.error("something went wrong, refresh  and try again")
        throw error
    }
}

export const bookVisit = async (date, propertyId, email, token) => {
    try {
        await api.post(`/user/bookVisit/${propertyId}`, {
            email,
            id: propertyId,
            date: dayjs(date).format("DD/MM/YYYY")
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

        )
    } catch (error) {
        toast.error("something went wrong, please try again")
        throw error
    }
}


export const removeBooking = async (id, email, token) => {
    try {
        await api.post(
            `/user/removeBooking/${id}`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    } catch (error) {
        toast.error("something went wrong, refresh and try again")
        throw error
    }
}

export const toFav = async (id, email, token) => {
    try {
        await api.post(`/user/favourites/${id}`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        )
    } catch (error) {
        toast.error("something went wrong, try again")
        throw error
    }
}

export const getAllFav = async (email, token) => {
    if (!token) return
    try {
        const res = await api.post(`/user/getFavourites`,
            {
                email
            }
            , // query params
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data["favResidenciesID"];
    } catch (error) {
        //  toast.error("something went wrong, refresh  and try again")
        throw error
    }
}


export const getAllBookings = async (email, token) => {
    if (!token) return
    try {
        const res = await api.post(`/user/allBookings`,
            {
                email
            },
            {
                Authorization: `Bearer ${token}`
            }
        );
        return res.data["bookedVisits"];

    } catch (error) {
        //   toast.error("something went wrong, try again")
        throw error
    }
}
export const createResidency = async (data, token) => {
    if (!token) return
    try {
        const res = await api.post(
            `/residency/create`,
            {
                data
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        );

    } catch (error) {
        toast.error("something went wrong, try again")
        throw error
    }
}