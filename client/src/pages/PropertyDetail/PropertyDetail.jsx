import React, { useState, useContext } from 'react';
import './PropertyDetail.css';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useApi } from '../../utils/api';
import { PuffLoader } from "react-spinners";
import { FaShower } from 'react-icons/fa';
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md';
import { AiTwotoneCar } from 'react-icons/ai';
import Map from '../../components/Map/Map';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../../components/BookingModal/BookingModal';
import UserDetailContext from '../../context/UserDetailContext.js';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import Heart from '../../Heart/Heart.jsx';

const PropertyDetail = () => {
    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];

    const { getProperty, removeBooking } = useApi();
    const { user } = useAuth0();
    const { userDetails: { bookings }, setUserDetails } = useContext(UserDetailContext);

    const [modalOpened, setModalOpened] = useState(false);
    const validateLogin = useAuthCheck();

    // Fetch property details
    const { data, isLoading, isError } = useQuery(["property", id], () => getProperty(id));

    // Cancel booking mutation
    const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
        mutationFn: () => removeBooking(id, user?.email),
        onSuccess: () => {
            setUserDetails(prev => ({
                ...prev,
                bookings: prev.bookings.filter(booking => booking?.id !== id)
            }));
            toast.success("Booking cancelled", { position: 'bottom-right' });
        },
        onError: () => toast.error("Failed to cancel booking")
    });

    if (isLoading) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <PuffLoader />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <span>Error while fetching the property details</span>
                </div>
            </div>
        );
    }

    const isBooked = bookings?.some(booking => booking?.id === id);

    return (
        <div className="wrapper">
            <div className="flexColStart paddings innerWidth property-container">
                <div className="like">
                    <Heart id={id} />
                </div>
                <img src={data?.image} alt="home" />
            </div>

            <div className="paddings innerWidth flexCenter property-details">
                <div className="flexColStart left">
                    <div className='head'>
                        <span className='primaryText'>{data?.title}<br /></span>
                        <span className='orangeText' style={{ fontSize: '1.5rem' }}>$ {data?.price}</span>
                    </div>

                    <div className="flexStart facilities">
                        <div className="flexStart facility">
                            <FaShower size={20} color="#1F3E72" />
                            <span>{data?.facilities.bathrooms} Bathrooms</span>
                        </div>
                        <div className="flexStart facility">
                            <AiTwotoneCar size={20} color="#1F3E72" />
                            <span>{data?.facilities.parkings} Parkings</span>
                        </div>
                        <div className="flexStart facility">
                            <MdMeetingRoom size={20} color="#1F3E72" />
                            <span>{data?.facilities.bedrooms} Bedrooms</span>
                        </div>
                    </div>

                    <span className="secondaryText" style={{ textAlign: "justify" }}>
                        {data?.description}
                    </span>

                    <div className="flexStart address" style={{ gap: "1rem" }}>
                        <MdLocationPin size={25} />
                        <span className='secondaryText'>{data?.address} {data?.city} {data?.country}</span>
                    </div>

                    {isBooked ? (
                        <>
                            <Button
                                variant="outline"
                                w={"100%"}
                                color="red"
                                onClick={() => cancelBooking()}
                                disabled={cancelling}
                            >
                                Cancel Booking
                            </Button>
                            <span>
                                Your visit booked for date {bookings?.find(booking => booking?.id === id)?.date}
                            </span>
                        </>
                    ) : (
                        <button
                            className="button"
                            onClick={() => {
                                if (validateLogin()) {
                                    setModalOpened(true);
                                }
                            }}
                        >
                            Book Your Visit
                        </button>
                    )}

                    <BookingModal
                        opened={modalOpened}
                        setOpened={setModalOpened}
                        propertyId={id}
                        email={user?.email}
                    />
                </div>

                <div className="map right">
                    <Map
                        address={data?.address}
                        city={data?.city}
                        coountry={data?.country}
                    />
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
