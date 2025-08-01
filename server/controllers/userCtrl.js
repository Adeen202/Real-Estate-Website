import asyncHandler from "express-async-handler";
import { ClientSession } from "mongodb";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {

    console.log("creating a user");
    let { email } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email: email } });
    if (!userExists) {
        const user = await prisma.user.create({ data: req.body });
        res.send({
            message: "user registered successfully",
            user: user,

        });
    }
    else res.status(201).send({
        message: "user already exists"

    });
});

export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;
    console.log("entered")
    console.log(id, email, date)
    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        })
        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400).send({ message: "Residency already booked" })
        } else {
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookedVisits: {
                        push: {
                            id, date
                        }
                    }
                }

            });
            res.send("booked successfully")
        }
    } catch (err) {
        throw new Error(err.message)
    }
});

export const getAllBookings = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const bookings = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        })
        res.status(200).send(bookings)
    } catch (err) {
        throw new Error(err.message)
    }
});

export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { bookedVisits: true }
        })
        const index = user.bookedVisits.findIndex((visit) => visit.id === id)
        if (index === -1) {
            res.status(404).json({ message: "booking not found" })
        }
        else {
            user.bookedVisits.splice(index, 1)
            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisits: user.bookedVisits
                }
            })
            res.send("Booking cancelled successfully")
        }
    } catch (err) {
        throw new Error(err.message)
    }
});


export const addToFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;
    try {

        const user = await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesID: true }
        });

        if (user.favResidenciesID.includes(rid)) {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            });
            res.send({ message: "Residency removed from favourites", user: updatedUser })
        }

        else {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        push: rid
                    }
                }
            });

            res.send({ message: "Residency added to favourites", user: updatedUser })
        }

    } catch (err) {
        throw new Error(err.message);
    }


});


export const getAllFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const favs = await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesID: true }
        })

        res.send(favs)
    } catch (err) {
        throw new Error(err.message)
    }

});