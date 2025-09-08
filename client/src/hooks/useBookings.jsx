import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../context/UserDetailContext'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useApi } from "../utils/api";

const useFavourites = () => {

    const { userDetails, setUserDetails } = useContext(UserDetailContext)
    const queryRef = useRef()
    const { user } = useAuth0()
    const { getAllFav } = useApi();
    const { data, isLoading, isError, refetch } = useQuery(
        "allFavourites",
        async () => {
            if (!user) return [];
            return await getAllFav(user.email); // just pass email, token is handled internally
        },
        {
            onSuccess: (data) =>
                setUserDetails((prev) => ({ ...prev, favourites: data })),
            enabled: !!user,
            staleTime: 30000,
        }
    );

    queryRef.current = refetch;
    useEffect(() => {
        queryRef.current && queryRef.current();
    }, [user]);

    return { data, isError, isLoading, refetch }
}

export default useFavourites
