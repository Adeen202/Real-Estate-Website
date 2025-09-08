import React, { useContext, useEffect } from 'react';
import Footer from "../Footer/Footer";
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetailContext';
import { useMutation } from 'react-query';
import { useApi } from '../../utils/api.js'; // Make sure the path is correct
import useFavourites from '../../hooks/useFavourites';
import useBookings from '../../hooks/useBookings';

const Layout = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { createUser } = useApi(); // useApi handles token internally

  const { mutate } = useMutation({
    mutationKey: ['registerUser', user?.email],
    mutationFn: () => createUser(user?.email),
  });

  useFavourites();
  useBookings();

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      // Call createUser through the mutation
      mutate();
      // Optionally store email in context
      setUserDetails(prev => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [isAuthenticated, user?.email, mutate, setUserDetails]);

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
