import React, { useContext, useEffect } from 'react';
import Footer from "../Footer/Footer";
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetailContext';
import { useMutation } from 'react-query';
import { useApi } from '../../utils/api.js';
import useFavourites from '../../hooks/useFavourites';
import useBookings from '../../hooks/useBookings';

const Layout = () => {
    const { isAuthenticated, user } = useAuth0();
    const { setUserDetails } = useContext(UserDetailContext);

    const { createUser } = useApi();

    // Initialize favourites and bookings hooks
    useFavourites();
    useBookings();

    // Mutation to register user
    const { mutate: registerUserMutation } = useMutation({
        mutationFn: (email) => createUser(email),
        onError: (err) => console.error("User registration failed:", err),
    });

    useEffect(() => {
        if (isAuthenticated && user?.email) {
            // Update user details in context
            setUserDetails((prev) => ({
                ...prev,
                email: user.email,
            }));

            // Call createUser mutation
            registerUserMutation(user.email);
        }
    }, [isAuthenticated, user?.email, setUserDetails, registerUserMutation]);

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
