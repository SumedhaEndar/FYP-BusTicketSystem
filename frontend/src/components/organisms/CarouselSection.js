import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Axios from "axios";

function CarouselSection(){
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        Axios.get('/api/customers/carousels')
            .then((response) => {
                setImageUrls(response.data);
            })
            .catch((error) => {
                console.error('Error retrieving image URLs:', error);
            });
    }, []);

    return(
        <Carousel>
            {imageUrls.map((imageUrl, index)=>(
                <Carousel.Item interval={2250}>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:4000${imageUrl}`}
                        alt={`Carousel ${index}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default CarouselSection