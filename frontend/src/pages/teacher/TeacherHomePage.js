/* eslint-disable no-unused-vars */
import { Container, Grid, Paper, Typography, Button, Box, useTheme, Avatar, Divider } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const TeacherHomePage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <PageWrapper>
            <Container maxWidth="xl">
                {/* Welcome Section */}
                <WelcomeSection>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 3,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,242,245,0.95) 100%)',
                            borderRadius: '20px',
                            padding: '2rem',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.4)'
                        }}>
                            <StyledAvatar>
                                {currentUser?.name?.charAt(0)}
                            </StyledAvatar>
                            <Box>
                                <Typography 
                                    variant="h3" 
                                    sx={{ 
                                        fontWeight: 700,
                                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    Welcome, {currentUser?.name}
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        mt: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <span style={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                        {currentUser?.teachSubject?.name}
                                    </span>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                                    <span style={{ color: theme.palette.text.secondary }}>
                                        {currentUser?.teachSclass?.name}
                                    </span>
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </WelcomeSection>

                {/* Stats Section */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {[
                        { 
                            icon: Students, 
                            title: "Class Students", 
                            value: numberOfStudents, 
                            color: "#2196f3",
                            gradient: "linear-gradient(135deg, #2196f3 0%, #21CBF3 100%)"
                        },
                        { 
                            icon: Lessons, 
                            title: "Total Lessons", 
                            value: numberOfSessions, 
                            color: "#4caf50",
                            gradient: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)"
                        },
                        { 
                            icon: Tests, 
                            title: "Tests Taken", 
                            value: 24, 
                            color: "#ff9800",
                            gradient: "linear-gradient(135deg, #FF9800 0%, #FFC107 100%)"
                        },
                        { 
                            icon: Time, 
                            title: "Total Hours", 
                            value: 30, 
                            suffix: "hrs", 
                            color: "#9c27b0",
                            gradient: "linear-gradient(135deg, #9C27B0 0%, #E040FB 100%)"
                        }
                    ].map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <StyledCard elevation={0}>
                                    <IconWrapper gradient={stat.gradient}>
                                        <img src={stat.icon} alt={stat.title} style={{ width: '32px', height: '32px' }} />
                                    </IconWrapper>
                                    <StatInfo>
                                        <StatTitle>{stat.title}</StatTitle>
                                        <StatValue style={{ background: stat.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                            <CountUp
                                                start={0}
                                                end={stat.value}
                                                duration={2}
                                                suffix={stat.suffix}
                                            />
                                        </StatValue>
                                    </StatInfo>
                                </StyledCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Content Grid */}
                <Grid container spacing={4}>
                    {/* Notices Section */}
                    <Grid item xs={12} lg={8}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <ContentCard>
                                <Typography 
                                    variant="h5" 
                                    gutterBottom 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: theme.palette.primary.main,
                                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                                        paddingBottom: '0.5rem',
                                        marginBottom: '1.5rem'
                                    }}
                                >
                                    Notice Board
                                </Typography>
                                <SeeNotice />
                            </ContentCard>
                        </motion.div>
                    </Grid>

                    {/* Quick Actions Section */}
                    <Grid item xs={12} lg={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <ContentCard>
                                <Typography 
                                    variant="h5" 
                                    gutterBottom 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: theme.palette.secondary.main,
                                        borderBottom: `2px solid ${theme.palette.secondary.main}`,
                                        paddingBottom: '0.5rem',
                                        marginBottom: '1.5rem'
                                    }}
                                >
                                    Quick Actions
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} lg={12}>
                                        <ActionButton
                                            variant="contained"
                                            color="primary"
                                            href="https://forms.gle/cBLLjqGQQXUW9SgLA"
                                            target="_blank"
                                            fullWidth
                                            startIcon={<i className="fas fa-chalkboard-teacher" />}
                                        >
                                            Workshop Registration
                                        </ActionButton>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={12}>
                                        <ActionButton
                                            variant="contained"
                                            color="secondary"
                                            href="https://forms.gle/2SCLQ4ErxEet3QzM8"
                                            target="_blank"
                                            fullWidth
                                            startIcon={<i className="fas fa-calendar-alt" />}
                                        >
                                            Leave Application
                                        </ActionButton>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={12}>
                                        <ActionButton
                                            variant="contained"
                                            sx={{
                                                background: 'linear-gradient(45deg, #00796b 30%, #009688 90%)',
                                                color: 'white'
                                            }}
                                            fullWidth
                                            startIcon={<i className="fas fa-book" />}
                                        >
                                            Course Materials
                                        </ActionButton>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={12}>
                                        <ActionButton
                                            variant="contained"
                                            sx={{
                                                background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                                                color: 'white'
                                            }}
                                            fullWidth
                                            startIcon={<i className="fas fa-clock" />}
                                        >
                                            Time Table
                                        </ActionButton>
                                    </Grid>
                                </Grid>
                            </ContentCard>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    min-height: 100vh;
    padding: 2rem 0;
    background: #f8fafc;
`;

const WelcomeSection = styled.div`
    margin-bottom: 3rem;
    
    @media (max-width: 600px) {
        margin-bottom: 2rem;
        
        .MuiTypography-h3 {
            font-size: 1.75rem;
        }
        
        .MuiTypography-h6 {
            font-size: 1rem;
        }
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 80px;
    height: 80px;
    font-size: 2rem;
    font-weight: 600;
    background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
    box-shadow: 0 8px 16px rgba(33, 150, 243, 0.2);
    
    @media (max-width: 600px) {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
    }
`;

const StyledCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-radius: 16px;
    background: white;
    transition: all 0.3s ease;
    border: 1px solid rgba(0,0,0,0.05);
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 600px) {
        padding: 1rem;
        gap: 1rem;
    }
`;

const IconWrapper = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.gradient};
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    
    img {
        filter: brightness(0) invert(1);
    }
`;

const StatInfo = styled.div`
    flex: 1;
`;

const StatTitle = styled(Typography)`
    font-size: 0.875rem;
    font-weight: 500;
    color: #637381;
    margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.2;
`;

const ContentCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    border-radius: 20px;
    background: white;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.05);
    
    @media (max-width: 600px) {
        padding: 1rem;
    }
`;

const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ActionButton = styled(Button)`
    text-transform: none;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;

    i {
        font-size: 1.25rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    &.MuiButton-containedPrimary {
        background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
    }

    &.MuiButton-containedSecondary {
        background: linear-gradient(45deg, #f50057 30%, #ff4081 90%);
    }
    
    @media (max-width: 600px) {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        
        i {
            font-size: 1rem;
        }
    }
    
    @media (min-width: 601px) and (max-width: 1200px) {
        justify-content: center;
    }
`;

export default TeacherHomePage;
