import React, { useContext, useEffect, useState } from 'react'
import useAuthCheck from '../hooks/useAuthCheck'
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../context/UserDetailContext'
import { useApi } from "../utils/api";
import { updateFavourites, checkFavourites } from '../utils/common'
const Heart = ({ id }) => {


    const [heartColor, setHeartColor] = useState("white")
    const validateLogin = useAuthCheck()

    const { user } = useAuth0()
    const email = user?.email;

    const {
        userDetails: { favourites, token },
        setUserDetails,
    } = useContext(UserDetailContext);

    const { toFav } = useApi();

    useEffect(() => {
        setHeartColor(() => checkFavourites(id, favourites))
    }, [favourites])

    const { mutate } = useMutation({
        mutationFn: async () => {
            if (!email) throw new Error("User not logged in");
            return await toFav(id, email); // token handled internally
        },
        onSuccess: () => {
            setUserDetails((prev) => ({
                ...prev,
                favourites: updateFavourites(id, prev.favourites),
            }));
        },
        onError: () => {
            // optional: show toast if needed
            toast.error("failed adding favourites")
        },
    });

    const handleLike = () => {
        if (validateLogin()) {

            mutate()
            setHeartColor((prev) => prev === "#fa3e5f" ? "white" : "#fa3e5f")

        }
    }
    return (
        <AiFillHeart size={24} color={heartColor}
            onClick={(e) => {
                e.stopPropagation()
                handleLike()
            }}
        />
    )
}
export default Heart
