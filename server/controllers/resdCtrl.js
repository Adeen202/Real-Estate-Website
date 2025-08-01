
import { prisma } from "../config/prismaConfig.js";
import asyncHandler from 'express-async-handler';


export const createResidency = asyncHandler(async (req, res) => {

    const { title, description, price, address, city, country, image, facilities, userEmail } = req.body.data
    console.log(req.body.data)
    try {
        const property = await prisma.property.create(
            {
                data:
                {
                    title,
                    description,
                    price,
                    address,
                    city,
                    country,
                    image,
                    facilities,
                    owner: { connect: { email: userEmail } },

                }
            });
        res.send({ message: "Residency created successfully", property })

    } catch (err) {
        if (err.code == "P2002") {
            throw new Error("A residency with the address already exists")
        }
        throw new Error(err.message)

    }

});

export const getAllResidencies = asyncHandler(async (req, res) => {
    //  try {
    const residencies = await prisma.property.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    res.send(residencies);
    console.log(residencies)
    //} catch (err) {
    //  console.error("🔥 Prisma error:", err);
    //  res.status(500).json({ error: err.message });
    ///}

});

export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const residency = await prisma.property.findUnique({
            where: { id }
        });

        res.send(residency);
    } catch (err) {
        throw new Error(err.message);

    }
});