import React, { useState } from 'react';
import axios from 'axios';
import ImageDisplay from './displayImage';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Data = reader.result.replace(/^data:image\/\w+;base64,/, '');
                await axios.post('http://localhost:3005/image/upload', { imageName: imageName, imageData: base64Data });
                alert('Image uploaded successfully');
            };
            reader.readAsDataURL(image);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    return (
        <div>
            <input type="text" placeholder="Enter image name" value={imageName} onChange={(e) => setImageName(e.target.value)} />
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>
            <ImageDisplay />
        </div>
    );
};

export default ImageUploader;
