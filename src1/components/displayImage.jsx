import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = ({ imageName }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/image/images/image11Tue Mar 19 2024 15:17:10 GMT+0000 (Greenwich Mean Time)`);
                setImageData(response.data.imageData);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [imageName]);

    return (
        <div>
            {imageData ? (
                <img src={`data:image/jpeg;base64,${imageData}`} alt={imageName} />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ImageDisplay;
