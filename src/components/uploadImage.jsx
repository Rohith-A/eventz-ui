import React, { useState } from 'react';
import axios from 'axios';
import ImageDisplay from './displayImage';
import { Button, TextField } from '@mui/material';

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
        <TextField type='file' onChange={handleImageChange}  sx={{m: 2, width: '30%'}} />
        <TextField type='text' placeholder="Enter image name" value={imageName} sx={{m: 2, width: '30%'}} onChange={(e) => setImageName(e.target.value)} />
        <Button variant="contained" sx={{ml:2, mt: 3, background: 'color(rec2020 0.32 0.43 0.62)' }}  onClick={handleUpload}>Upload Image</Button>
            <ImageDisplay />
        </div>
    );
};

export default ImageUploader;
