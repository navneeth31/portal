/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
    Box, Container, Grid, Card, CardContent, Typography,
    Avatar, LinearProgress, IconButton, Tooltip, Paper
} from '@mui/material';
import {
    School as SchoolIcon,
    Class as ClassIcon,
    Badge as BadgeIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CustomPieChart from '../../components/CustomPieChart';

const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'visible',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)'
    }
}));

const StatCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
    borderRadius: 12,
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }
}));

const StudentProfile = () => {
    const dispatch = useDispatch();
    const { userDetails, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    if (loading) {
        return (
            <Box sx={{ width: '100%', mt: 10 }}>
                <LinearProgress />
            </Box>
        );
    }

    // Calculate attendance and get subject count
    const overallAttendance = userDetails?.attendance?.reduce((acc, curr) => acc + curr.attendance, 0) / userDetails?.attendance?.length || 0;
    const totalSubjects = userDetails?.sclassName?.subjects?.length || 0;

    const stats = [
        // { label: 'Attendance', value: `${Math.round(overallAttendance)}%`, color: '#4CAF50' },
        // { label: 'Enrolled Subjects', value: totalSubjects, color: '#FF9800' }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                {/* Profile Card */}
                <Grid item xs={12} md={4}>
                    <StyledCard>
                        <CardContent sx={{ textAlign: 'center', py: 5 }}>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    margin: '0 auto 20px',
                                    backgroundColor: 'primary.main',
                                    fontSize: '3rem'
                                }}
                            >
                                {userDetails?.name?.charAt(0)}
                            </Avatar>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                {userDetails?.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Student
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Tooltip title="Edit Profile">
                                    <IconButton color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </StyledCard>

                    {/* Stats Cards */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {stats.map((stat, index) => (
                            <Grid item xs={12} key={index}>
                                <StatCard>
                                    <Typography variant="h6" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: stat.color, fontWeight: 600 }}>
                                        {stat.value}
                                    </Typography>
                                </StatCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Details Card */}
                <Grid item xs={12} md={8}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                                Academic Information
                            </Typography>
                            <Grid container spacing={3}>
                                {[
                                    {
                                        icon: <BadgeIcon color="primary" />,
                                        label: 'Roll Number',
                                        value: userDetails?.rollNum
                                    },
                                    {
                                        icon: <ClassIcon color="primary" />,
                                        label: 'Class',
                                        value: userDetails?.sclassName?.sclassName
                                    },
                                    {
                                        icon: <SchoolIcon color="primary" />,
                                        label: 'School',
                                        value: userDetails?.school?.schoolName
                                    },
                                    {
                                        icon: <EmailIcon color="primary" />,
                                        label: 'Email',
                                        value: userDetails?.email
                                    },
                                    {
                                        icon: <PhoneIcon color="primary" />,
                                        label: 'Contact',
                                        value: userDetails?.phone || 'Not Available'
                                    },
                                    {
                                        icon: <LocationIcon color="primary" />,
                                        label: 'Address',
                                        value: userDetails?.address || 'Not Available'
                                    }
                                ].map((item, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor: 'background.paper',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        >
                                            <Box sx={{ mr: 2 }}>{item.icon}</Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    {item.label}
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {item.value || 'Not Available'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Attendance Chart
                            {userDetails?.attendance && userDetails.attendance.length > 0 && (
                                <Box sx={{ mt: 4 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                                        Attendance Overview
                                    </Typography>
                                    <CustomPieChart
                                        data={[
                                            { name: 'Present', value: overallAttendance },
                                            { name: 'Absent', value: 100 - overallAttendance }
                                        ]}
                                    />
                                </Box>
                            )} */}
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StudentProfile;