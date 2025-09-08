import React, { useState } from 'react'
import "./Header.css"
import { BiMenuAltRight } from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal'
import useAuthCheck from '../../hooks/useAuthCheck'


const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const validateLogin = useAuthCheck()
    //const handleAddPropertyClick = () => setModalOpened(true);

    const handleAddPropertyClick = () => {

        if (validateLogin()) {
            setModalOpened(true);


        }
    }

    const {
        isLoading, // Loading state, the SDK needs to reach Auth0 on load
        isAuthenticated,
        error,
        loginWithRedirect: login, // Starts the login flow
        logout: auth0Logout, // Starts the logout flow
        user, // User profile
    } = useAuth0();
    window.addEventListener("click", () => {
    });
    const signup = () =>
        login({ authorizationParams: { screen_hint: "signup" } });

  const handleLogin = () => {
    loginWithRedirect(); // redirect user to Auth0 login page
  };
    const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });

    if (isLoading) return "Loading...";

    const getMenuStyles = (menuOpened) => {
        if (document.documentElement.clientWidth <= 768) {
            return {
                opacity: menuOpened ? 1 : 0,
                visibility: menuOpened ? 'visible' : 'hidden',
                pointerEvents: menuOpened ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, visibility 0.3s ease',
            };
        }
        return {};
    };

    return (

        <section className="h-wrapper">
            <div className=" flexCenter  paddings innerWidth h-container">

                <Link to="/">
                    <img src='./bird-logo.png' alt='logo' width={150} />
                </Link>

                <OutsideClickHandler
                    onOutsideClick={() => {
                        setMenuOpened(false)
                    }

                    }
                >

                    <div className=" flexCenter h-menu"
                        style={getMenuStyles(menuOpened)}
                    >
                        <NavLink to="/">Home</NavLink>


                        <NavLink to="/properties">Properties</NavLink>


                        <a href="mailto:aaa@gmail.com">Contact</a>
                        <div onClick={handleAddPropertyClick}>Add Property</div>
                        <AddPropertyModal
                            opened={modalOpened}
                            setOpened={setModalOpened}
                        />
                        {
                            !isAuthenticated ?
                                <button className='button' onClick={login}>Login</button> :
                                <div>
                                    <ProfileMenu user={user} logout={logout} />
                                </div>
                        }
                    </div>

                </OutsideClickHandler>

                <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>

                    <BiMenuAltRight size={30} />
                </div>

            </div>

        </section>
    )
}

export default Header
