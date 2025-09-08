import React, { useState, useContext } from 'react'
import { Button, Modal } from '@mantine/core'
import { DatePicker, DatePickerInput } from '@mantine/dates'
import userDetailContext from '../../../src/context/UserDetailContext.js'
import { useMutation } from 'react-query'
import { useApi } from "../../utils/api.js";
import { toast } from 'react-toastify'
import dayjs from 'dayjs'



const BookingModal = ({ opened, setOpened, email, propertyId }) => {

    const handleBookingSuccess = () => {

        setUserDetails((prev) => ({
            ...prev,
            bookings: [
                ...prev.bookings,
                { //just like in mongodb
                    id: propertyId, date: dayjs(value).format("DD/MM/YYYY")
                }
            ]
        }))
        toast.success("You've booked your visit successfully"), {
            position: "bottom-right",
        }
    }
    const [value, setValue] = useState(null);
    const { userDetails: { token }, setUserDetails } = useContext(userDetailContext)


    const { bookVisit } = useApi();
    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            if (!email) throw new Error("User not logged in");
            await bookVisit(value, propertyId, email); // token handled internally
        },
        onSuccess: handleBookingSuccess,
        onError: (error) => {
            // show error toast
            const msg = error?.response?.data?.message || "Failed to book visit";
            toast.error(msg, { position: "bottom-right" });
        },
        onSettled: () => setOpened(false),
    });
    return (

        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Select your date of visit"
            centered
            size="md"
        >
            <div>
                <span>
                    <div className="flexColCenter" style={{ gap: "1rem" }}>
                        <DatePickerInput
                            value={value}
                            onChange={setValue}
                            minDate={new Date()}
                            placeholder='Pick a Date'
                            size="md"
                            styles={{
                                // Calendar (day view)
                                calendar: {
                                    padding: '1rem',
                                },
                                day: {
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    margin: '0.3rem',
                                    fontSize: '1rem',
                                },
                                weekday: {
                                    fontSize: '0.9rem',
                                    marginBottom: '0.3rem',
                                },
                                month: {
                                    gap: '20px',

                                },
                                calendarHeader: {
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0 1rem',
                                },
                                calendarHeaderControl: {
                                    width: '1.5rem',   // ⬅️ reduce width
                                    height: '1.5rem',  // ⬅️ reduce height
                                    fontSize: '1rem',  // ⬅️ control arrow size
                                }

                            }}
                        />

                        <Button disabled={!value || isLoading} onClick={() => {

                            mutate();
                        }}>

                            Book Visit
                        </Button>
                    </div>
                </span>
            </div >
        </Modal >

    )
}

export default BookingModal
