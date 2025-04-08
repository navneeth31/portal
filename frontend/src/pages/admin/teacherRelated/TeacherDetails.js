import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import {
    Box, Container, Grid, Card, CardContent, Typography,
    Avatar, LinearProgress, IconButton, Tooltip
} from '@mui/material';
import {
    School as SchoolIcon,
    MenuBook as MenuBookIcon,
    Timer as TimerIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Edit as EditIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { teacherDetails, loading } = useSelector((state) => state.teacher);
    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    useEffect(() => {
        dispatch(getTeacherDetails(params.id));
    }, [dispatch, params.id]);

    if (loading) {
        return (
            <Box sx={{ width: '100%', mt: 10 }}>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                    Faculty Profile
                </Typography>
            </Box>

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
                                {teacherDetails?.name?.charAt(0)}
                            </Avatar>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                {teacherDetails?.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Faculty Member
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
                                        icon: <SchoolIcon color="primary" />,
                                        label: 'Department',
                                        value: teacherDetails?.teachSclass?.sclassName
                                    },
                                    {
                                        icon: <MenuBookIcon color="primary" />,
                                        label: 'Subject',
                                        value: teacherDetails?.teachSubject?.subName || 'Not Assigned',
                                        condition: isSubjectNamePresent
                                    },
                                    {
                                        icon: <TimerIcon color="primary" />,
                                        label: 'Teaching Sessions',
                                        value: teacherDetails?.teachSubject?.sessions || 'Not Assigned',
                                        condition: isSubjectNamePresent
                                    },
                                    {
                                        icon: <EmailIcon color="primary" />,
                                        label: 'Email',
                                        value: teacherDetails?.email || 'Not Available'
                                    },
                                    {
                                        icon: <PhoneIcon color="primary" />,
                                        label: 'Contact',
                                        value: teacherDetails?.phone || 'Not Available'
                                    }
                                ].map((item, index) => (
                                    (item.condition === undefined || item.condition) && (
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
                                                        {item.value}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                ))}
                            </Grid>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TeacherDetails;