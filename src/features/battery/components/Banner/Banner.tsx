import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import styles from './style.module.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Import images directly
import banner1 from '../../../../asset/images/c5px-banner-xe-may.jpg';
import banner2 from '../../../../asset/images/baxedien.jpg';
import banner3 from '../../../../asset/images/namxedien.jpg';

const images = [banner1, banner2, banner3];

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    useEffect(() => {
        console.log('Current images:', images);
        console.log('Current slide:', currentSlide);
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        // Auto slide every 5 seconds
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Log để debug backgroundImage
        const img = new Image();
        img.onload = () => console.log('Image loaded successfully:', images[currentSlide]);
        img.onerror = () => console.error('Image failed to load:', images[currentSlide]);
        img.src = images[currentSlide];
    }, [currentSlide]);

    return (
        <Box className={styles.container}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
            
            <button className={`${styles.navigationButton} ${styles.prev}`} onClick={prevSlide}>
                <ChevronLeftIcon />
            </button>
            <button className={`${styles.navigationButton} ${styles.next}`} onClick={nextSlide}>
                <ChevronRightIcon />
            </button>

            <div className={styles.navigationDots}>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </Box>
    );
}
