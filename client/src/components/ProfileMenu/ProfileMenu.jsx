
import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const ProfileMenu = ({ user, logout }) => {



    if (!user) return null;
    const navigate = useNavigate();
    return (
        <div>
            <Menu shadow="md" width={200} transitionProps={{ transition: "fade", duration: 150 }} >
                <Menu.Target>
                    <Avatar src={user.picture} alt="user image" radius={14} style={{ cursor: 'pointer' }} />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
                        Favorites
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
                        Bookings
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            localStorage.clear();
                            logout();
                        }
                        }>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu >
        </div >
    )

}

export default ProfileMenu