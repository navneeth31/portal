import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Carousel from 'react-material-ui-carousel';
import Students1 from "../assets/gctcName.png";
import Students2 from "../assets/gctcView1.jpg";
import Students3 from "../assets/gctcView2.jpg";
import Students4 from "../assets/gctc_img.jpeg";
import { LightPurpleButton } from '../components/buttonStyles';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Homepage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Sample carousel items - replace with your actual images
    const carouselItems = [
        {
            image: Students2,
            alt: "GCTC Campus View 1"
        },
        {
            image: Students3, // Replace with different images
            alt: "GCTC Campus View 2"
        },
        {
            image: Students4, // Replace with different images
            alt: "GCTC Campus View 3"
        }
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <StyledContainer maxWidth="xl">
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} data-aos="fade-right">
                    <ImageContainer>
                        <StyledImage src={Students1} alt="GCTC Name" />
                        <CarouselContainer>
                            <Carousel
                                animation="slide"
                                interval={4000}
                                indicators={true}
                                navButtonsAlwaysVisible={true}
                                navButtonsProps={{
                                    style: {
                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        color: '#550080'
                                    }
                                }}
                            >
                                {carouselItems.map((item, index) => (
                                    <CarouselImage
                                        key={index}
                                        src={item.image}
                                        alt={item.alt}
                                    />
                                ))}
                            </Carousel>
                        </CarouselContainer>
                    </ImageContainer>
                </Grid>
                <Grid item xs={12} md={6} data-aos="fade-left">
                    <ContentWrapper>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                        >
                            <StyledTitle variant="h1">
                                Welcome to
                                <GradientText> GCTC PORTAL</GradientText>
                            </StyledTitle>

                            <StyledDescription>
                                Experience seamless education management with our comprehensive portal.
                            </StyledDescription>

                            <ButtonContainer>
                                <StyledLink to="/choose">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <LightPurpleButton variant="contained" fullWidth>
                                            Login →
                                        </LightPurpleButton>
                                    </motion.div>
                                </StyledLink>

                                <SignUpText>
                                    New to GCTC Portal?{' '}
                                    <StyledSignUpLink to="/Adminregister">
                                        Create an account
                                    </StyledSignUpLink>
                                </SignUpText>
                            </ButtonContainer>
                        </motion.div>
                    </ContentWrapper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);

    @media (max-width: 900px) {
        padding: 1rem;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const StyledImage = styled.img`
    width: 100%;
    border-radius: 20px;
    transition: transform 0.3s ease;
`;

const CarouselContainer = styled.div`
    margin-top: 2rem;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const CarouselImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
`;

const ContentWrapper = styled.div`
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);

    @media (max-width: 900px) {
        padding: 1.5rem;
    }
`;

const StyledTitle = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: #333;
    @media (max-width: 600px) {
        font-size: 2.5rem;
    }
`;

const GradientText = styled.span`
    font-size: 4rem;
    background: linear-gradient(45deg, #550080, #8B00FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    letter-spacing: -1px;
    display: inline-block;
    margin-left: 0.5rem;
    @media (max-width: 600px) {
        font-size: 3rem;
    }
`;

const StyledDescription = styled.div`
    color: #4a4a4a;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 100%;
`;

const SignUpText = styled.p`
    text-align: center;
    color: #666;
    margin-top: 1rem;
`;

const StyledSignUpLink = styled(Link)`
    color: #7f56da;
    text-decoration: none;
    font-weight: 600;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -2px;
        left: 0;
        background: linear-gradient(135deg, #7f56da 0%, #550080 100%);
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    &:hover:after {
        transform: scaleX(1);
    }
`;
