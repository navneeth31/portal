/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Box, Button, Collapse, Table, TableBody, TableHead, Typography,
    Container, Grid, Avatar, Card, CardContent, Chip, LinearProgress,
    IconButton
} from '@mui/material';
import { 
    KeyboardArrowDown, KeyboardArrowUp,
    Person as PersonIcon,
    School as SchoolIcon,
    Class as ClassIcon,
    Assessment as AssessmentIcon,
    CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <PageContainer>
            <Container maxWidth="lg">
                {loading ? (
                    <Box sx={{ width: '100%', mt: 4 }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {/* Student Profile Header */}
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ProfileCard>
                                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
                                        <Avatar
                                            sx={{
                                                width: { xs: 80, md: 100 },
                                                height: { xs: 80, md: 100 },
                                                bgcolor: 'primary.main',
                                                fontSize: { xs: '2rem', md: '2.5rem' }
                                            }}
                                        >
                                            {userDetails.name ? userDetails.name.charAt(0) : 'S'}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h4" sx={{ 
                                                fontSize: { xs: '1.5rem', md: '2rem' },
                                                fontWeight: 600,
                                                mb: 1
                                            }}>
                                                {userDetails.name}
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm="auto">
                                                    <InfoChip
                                                        icon={<PersonIcon />}
                                                        label={`Roll No: ${userDetails.rollNum}`}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm="auto">
                                                    <InfoChip
                                                        icon={<ClassIcon />}
                                                        label={`Class: ${sclassName.sclassName}`}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm="auto">
                                                    <InfoChip
                                                        icon={<SchoolIcon />}
                                                        label={studentSchool.schoolName}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </CardContent>
                                </ProfileCard>
                            </motion.div>
                        </Grid>

                        {/* Attendance Section */}
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <StyledCard>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                Attendance Overview
                                            </Typography>
                                            <PurpleButton
                                                variant="contained"
                                                onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                                                startIcon={<AssessmentIcon />}
                                            >
                                                Add Attendance
                                            </PurpleButton>
                                        </Box>
                                        
                                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={8}>
                                                    {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                                        if (subName === teachSubject) {
                                                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                                            return (
                                                                <Box key={index} sx={{ mb: 3 }}>
                                                                    <Table>
                                                                        <TableHead>
                                                                            <StyledTableRow>
                                                                                <StyledTableCell>Subject</StyledTableCell>
                                                                                <StyledTableCell>Present</StyledTableCell>
                                                                                <StyledTableCell>Total Sessions</StyledTableCell>
                                                                                <StyledTableCell>Attendance %</StyledTableCell>
                                                                                <StyledTableCell align="center">Details</StyledTableCell>
                                                                            </StyledTableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            <StyledTableRow>
                                                                                <StyledTableCell>{subName}</StyledTableCell>
                                                                                <StyledTableCell>{present}</StyledTableCell>
                                                                                <StyledTableCell>{sessions}</StyledTableCell>
                                                                                <StyledTableCell>
                                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                        <Typography variant="body2">
                                                                                            {subjectAttendancePercentage}%
                                                                                        </Typography>
                                                                                        <LinearProgress 
                                                                                            variant="determinate" 
                                                                                            value={subjectAttendancePercentage}
                                                                                            sx={{ 
                                                                                                width: 100,
                                                                                                height: 8,
                                                                                                borderRadius: 4
                                                                                            }}
                                                                                        />
                                                                                    </Box>
                                                                                </StyledTableCell>
                                                                                <StyledTableCell align="center">
                                                                                    <IconButton 
                                                                                        size="small"
                                                                                        onClick={() => handleOpen(subId)}
                                                                                        sx={{ 
                                                                                            color: 'primary.main',
                                                                                            '&:hover': { 
                                                                                                backgroundColor: 'primary.lighter'
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                                                    </IconButton>
                                                                                </StyledTableCell>
                                                                            </StyledTableRow>
                                                                            <StyledTableRow>
                                                                                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                                                        <Box sx={{ margin: 2 }}>
                                                                                            <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600 }}>
                                                                                                Attendance Details
                                                                                            </Typography>
                                                                                            <Table size="small">
                                                                                                <TableHead>
                                                                                                    <StyledTableRow>
                                                                                                        <StyledTableCell>Date</StyledTableCell>
                                                                                                        <StyledTableCell align="right">Status</StyledTableCell>
                                                                                                    </StyledTableRow>
                                                                                                </TableHead>
                                                                                                <TableBody>
                                                                                                    {allData.map((data, index) => {
                                                                                                        const date = new Date(data.date);
                                                                                                        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                                                        return (
                                                                                                            <StyledTableRow key={index}>
                                                                                                                <StyledTableCell>
                                                                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                                                        <CalendarIcon fontSize="small" color="action" />
                                                                                                                        {dateString}
                                                                                                                    </Box>
                                                                                                                </StyledTableCell>
                                                                                                                <StyledTableCell align="right">
                                                                                                                    <Chip 
                                                                                                                        label={data.status}
                                                                                                                        color={data.status === 'Present' ? 'success' : 'error'}
                                                                                                                        size="small"
                                                                                                                    />
                                                                                                                </StyledTableCell>
                                                                                                            </StyledTableRow>
                                                                                                        );
                                                                                                    })}
                                                                                                </TableBody>
                                                                                            </Table>
                                                                                        </Box>
                                                                                    </Collapse>
                                                                                </StyledTableCell>
                                                                            </StyledTableRow>
                                                                        </TableBody>
                                                                    </Table>
                                                                </Box>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                                            Overall Attendance
                                                        </Typography>
                                                        <Typography variant="h4" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                                                            {overallAttendancePercentage.toFixed(2)}%
                                                        </Typography>
                                                        <CustomPieChart data={chartData} />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            <Typography variant="body1" color="text.secondary">
                                                No attendance records available
                                            </Typography>
                                        )}
                                    </CardContent>
                                </StyledCard>
                            </motion.div>
                        </Grid>

                        {/* Marks Section */}
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <StyledCard>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                Subject Marks
                                            </Typography>
                                            <PurpleButton
                                                variant="contained"
                                                onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                                                startIcon={<AssessmentIcon />}
                                            >
                                                Add Marks
                                            </PurpleButton>
                                        </Box>
                                        
                                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                                            <Table>
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Subject</StyledTableCell>
                                                        <StyledTableCell>Marks</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {subjectMarks.map((result, index) => {
                                                        if (result.subName.subName === teachSubject) {
                                                            return (
                                                                <StyledTableRow key={index}>
                                                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                                    <StyledTableCell>
                                                                        <Chip 
                                                                            label={result.marksObtained}
                                                                            color={result.marksObtained >= 40 ? 'success' : 'error'}
                                                                        />
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </TableBody>
                                            </Table>
                                        ) : (
                                            <Typography variant="body1" color="text.secondary">
                                                No marks available
                                            </Typography>
                                        )}
                                    </CardContent>
                                </StyledCard>
                            </motion.div>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </PageContainer>
    );
};

const PageContainer = styled('div')({
    minHeight: '100vh',
    padding: '2rem 0',
    background: '#f8fafc',
    '@media (max-width: 600px)': {
        padding: '1rem 0'
    }
});

const ProfileCard = styled(Card)({
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    overflow: 'visible',
    '@media (max-width: 600px)': {
        '& .MuiCardContent-root': {
            padding: '1rem',
            flexDirection: 'column',
            textAlign: 'center'
        }
    }
});

const StyledCard = styled(Card)({
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    '& .MuiTableCell-root': {
        '@media (max-width: 600px)': {
            padding: '8px',
            fontSize: '0.875rem'
        }
    }
});

const InfoChip = styled(Chip)({
    '& .MuiChip-label': {
        fontWeight: 500
    },
    '@media (max-width: 600px)': {
        width: '100%',
        justifyContent: 'flex-start'
    }
});

export default TeacherViewStudent;