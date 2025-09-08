import React, { useContext, useEffect } from 'react';
import Footer from "../Footer/Footer";
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetailContext';
import { useMutation } from 'react-query';
import { useApi } from '../../utils/api.js'
import useFavourites from '../../hooks/useFavourites';
import useBookings from '../../hooks/useBookings';

const Layout = () => {


    useFavourites()
    useBookings()
    const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
    const { setUserDetails } = useContext(UserDetailContext);
const { createUser } = useApi()
    const { mutate } = useMutation({
        mutationKey: [user?.email],
        mutationFn: (token) => createUser(user?.email, token),
    });

    useEffect(() => {
        const registerUser = async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                });

                setUserDetails((prev) => ({
                    ...prev,
                    token,
                }));

                mutate(token);
            } catch (error) {
                console.error("Failed to get token or register user:", error);
            }
        };

        if (isAuthenticated) {
            registerUser();
        }
    }, [isAuthenticated, mutate, getAccessTokenSilently, setUserDetails]);


    return (
        <>
            <div style={{ background: "var(--black)", overflow: "hidden" }}>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Layout;
