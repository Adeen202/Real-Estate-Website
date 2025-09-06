import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";
import './UploadImage.css'
import { Button, Group } from '@mantine/core';
const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {

    const [imageURL, setImageURL] = useState(propertyDetails.image);
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "djp2iegz5",
                uploadPreset: "uvndk6zq",
                maxFiles: 1,
                clientAllowedFormats: ["png", "jpeg", "jpg"],
                resourceType: "image",
            },
            (err, result) => {
                if (err) {
                    console.error("Upload Widget Error:", err);
                    return;
                }
                if (result.event === "success") {
                    setImageURL(result.info.secure_url)
                    /*/                    if (result.event === "queues-end" && result.info.files) {
                    //                      const uploadedFile = result.info.files[0]?.uploadInfo;
                    if (uploadedFile && !["image/png", "image/jpeg", "image/jpg"].includes(uploadedFile.resource_type + "/" + uploadedFile.format)) {
                        widgetRef.current.close();
                        alert("Only .png, .jpg, and .jpeg formats are allowed.");
                    }
                }    /*/
                }
            }
        )
    }, [])
    const handleNext = () => {
        setPropertyDetails((prev) => ({ ...prev, image: imageURL }))
        nextStep();
    }
    return (
        <div className="flexColCenter uploadWrapper">
            {
                !imageURL ? (
                    <div className="flexColCenter uploadZone"
                        onClick={() => widgetRef.current?.open()}
                    >
                        <AiOutlineCloudUpload size={50} color="grey" />
                        <span>Upload Image</span>
                    </div>
                ) : (
                    <div className="uploadedImage"
                        onClick={() => widgetRef.current?.open()}
                    >
                        <img src={imageURL} alt='' />
                    </div>
                )

            }

            <Group position="center">
                <Button variant="default" onClick={prevStep} >
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!imageURL}>
                    Next Step
                </Button>

            </Group>

        </div>
    )
}

export default UploadImage
