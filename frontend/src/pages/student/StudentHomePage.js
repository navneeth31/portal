import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { School, Assignment as AssignmentIcon, Lock, 
         CalendarMonth, Description, Work } from '@mui/icons-material';

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const quickLinks = [
        { title: 'Subjects', icon: <School />, count: numberOfSubjects },
        { title: 'Assignments', icon: <AssignmentIcon />, count: 15 },
        { title: 'Attendance', icon: <CalendarMonth />, count: `${Math.round(overallAttendancePercentage)}%` },
    ];

    const resourceLinks = [
        {
            title: 'Feedback Form',
            description: 'Share your valuable feedback',
            icon: <Description />,
            url: 'https://forms.gle/GeM7y84Gqu44gAwN9',
            color: '#1a237e'
        },
        {
            title: 'Workshop Registration',
            description: 'Register for upcoming workshops',
            icon: <Lock />,
            url: 'https://forms.gle/niLPjxjGtG39eT8V9',
            color: '#4a148c'
        },
        {
            title: 'Event Registration',
            description: 'Join college events',
            icon: <CalendarMonth />,
            url: 'https://forms.gle/xNQkcGCAEBcvaEpMA',
            color: '#311b92'
        },
        {
            title: 'Career Portal',
            description: 'Explore placement opportunities',
            icon: <Work />,
            url: 'https://gctcpg.netlify.app/',
            color: '#0d47a1'
        }
    ];

    return (
        <StyledContainer>
            <Container maxWidth="lg">
                <WelcomeCard>
                    <Typography variant="h4" gutterBottom>
                        Welcome, {currentUser.name}!!
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Track your academic progress and resources
                    </Typography>
                </WelcomeCard>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {quickLinks.map((link, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <StatsCard>
                                <StatsIconWrapper color={link.title.toLowerCase()}>
                                    {link.icon}
                                </StatsIconWrapper>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {link.title}
                                    </Typography>
                                    <Typography variant="h4" color="primary">
                                        {typeof link.count === 'number' ? (
                                            <CountUp start={0} end={link.count} duration={2} />
                                        ) : (
                                            link.count
                                        )}
                                    </Typography>
                                </Box>
                            </StatsCard>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Quick Access
                    </Typography>
                    <Grid container spacing={3}>
                        {resourceLinks.map((link, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <ResourceCard href={link.url} target="_blank">
                                    <IconWrapper style={{ backgroundColor: link.color }}>
                                        {link.icon}
                                    </IconWrapper>
                                    <Typography variant="h6" gutterBottom>
                                        {link.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {link.description}
                                    </Typography>
                                </ResourceCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={8}>
                        <NoticeCard>
                            <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                                <Typography variant="h6" gutterBottom sx={{ 
                                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                    mb: { xs: 1, sm: 2 }
                                }}>
                                </Typography>
                                <Box sx={{ maxHeight: { xs: '300px', sm: '400px' }, overflowY: 'auto' }}>
                                    <SeeNotice />
                                </Box>
                            </Box>
                        </NoticeCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ChartCard>
                            <Box sx={{ width: '100%', maxWidth: { xs: '240px', sm: '300px' } }}>
                                <Typography variant="h6" gutterBottom align="center" sx={{
                                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                    mb: { xs: 1, sm: 2 }
                                }}>
                                    Attendance Overview
                                </Typography>
                                {response ? (
                                    <Typography variant="body1">No Attendance Found</Typography>
                                ) : loading ? (
                                    <Typography variant="body1">Loading...</Typography>
                                ) : (
                                    subjectAttendance && Array.isArray(subjectAttendance) && 
                                    subjectAttendance.length > 0 ? (
                                        <CustomPieChart data={chartData} />
                                    ) : (
                                        <Typography variant="body1">No Attendance Found</Typography>
                                    )
                                )}
                            </Box>
                        </ChartCard>
                    </Grid>
                </Grid>
            </Container>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #0061ff 0%, #60efff 50%, #E2EBFF 100%);
    padding: 24px 0;
    
    @media (max-width: 600px) {
        padding: 16px 0;
    }
`;

const WelcomeCard = styled(Box)`
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    color: #2c3e50;
    padding: 2rem;
    border-radius: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    h4 {
        background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    @media (max-width: 600px) {
        padding: 1.5rem;
        border-radius: 20px;
        h4 {
            font-size: 1.5rem;
        }
    }
`;

const StatsCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border-color: rgba(255, 255, 255, 0.5);
    }
    
    @media (max-width: 600px) {
        padding: 1.25rem;
        border-radius: 16px;
    }
`;

const ResourceCard = styled.a`
    display: block;
    padding: 1.5rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border-color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 600px) {
        padding: 1.25rem;
        border-radius: 16px;
    }
`;

const NoticeCard = styled(Paper)`
    border-radius: 20px;
    overflow: hidden;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
        border-radius: 16px;
    }
`;

const ChartCard = styled(Paper)`
    padding: 1.5rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 600px) {
        padding: 1.25rem;
        border-radius: 16px;
    }
`;

const StatsIconWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => {
        switch (props.color) {
            case 'subjects': return 'rgba(33, 150, 243, 0.1)';
            case 'assignments': return 'rgba(63, 81, 181, 0.1)';
            case 'attendance': return 'rgba(76, 175, 80, 0.1)';
            default: return 'rgba(124, 77, 255, 0.1)';
        }
    }};
    
    svg {
        color: ${props => {
            switch (props.color) {
                case 'subjects': return '#2196f3';
                case 'assignments': return '#3f51b5';
                case 'attendance': return '#4caf50';
                default: return '#7c4dff';
            }
        }};
        font-size: 24px;
    }

    @media (max-width: 600px) {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        
        svg {
            font-size: 20px;
        }
    }
`;

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    
    svg {
        color: white;
        font-size: 20px;
    }

    @media (max-width: 600px) {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        
        svg {
            font-size: 18px;
        }
    }
`;

export default StudentHomePage;
