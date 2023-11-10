import { useState } from "react";

const UploadImageInput = ({ error, image,path, onImage }) => {

    const [selectedImage, setSelectedImage] = useState('');

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            onImage(file);
        }
    };

    const renderImage = () => {
        if (selectedImage) {
            return <img src={selectedImage} className="w-px-100 h-auto rounded-circle" alt="Profile" />;
        } else if (image !== null) {
            return <img src={path} className="w-px-100 h-auto rounded-circle" alt="Profile" />;
        } else {
            return (
                <img
                    src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    className="w-px-100 h-auto rounded-circle"
                    alt="Placeholder"
                />
            );
        }
    };

    return (
        <>
            {renderImage()}
            <input type="file" className="form-control mt-3" onChange={handleFileSelect} />
            {error && <span className="text-danger">{error}</span>}
        </>
    );
}
export default UploadImageInput;
