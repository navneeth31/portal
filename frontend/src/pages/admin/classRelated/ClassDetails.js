import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import {
    Box, Container, Typography, Tab, IconButton,
    Card, CardContent, Grid, Tooltip, LinearProgress
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import {
    PersonAddAlt1 as PersonAddAlt1Icon,
    PersonRemove as PersonRemoveIcon,
    Delete as DeleteIcon,
    PostAdd as PostAddIcon,
    Group as GroupIcon,
    Book as BookIcon,
    ArrowBack as ArrowBackIcon,
    Visibility as VisibilityIcon,
    EventNote as EventNoteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);
    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
        { id: 'actions', label: 'Actions', minWidth: 170 },
    ];

    const subjectRows = (subjectsList && subjectsList.length > 0) ? subjectsList.map((subject) => ({
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
    })) : [];

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="View Subject">
                    <IconButton 
                        onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
                        sx={{ color: 'primary.main' }}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Subject">
                    <IconButton 
                        onClick={() => deleteHandler(row.id, "Subject")}
                        sx={{ color: 'error.main' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />,
            name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        return (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {response ? (
                    <StyledCard>
                        <CardContent sx={{ textAlign: 'center', py: 5 }}>
                            <Typography variant="h6" color="text.secondary" mb={2}>
                                No Subjects Added Yet
                            </Typography>
                            <PurpleButton
                                variant="contained"
                                startIcon={<PostAddIcon />}
                                onClick={() => navigate("/Admin/addsubject/" + classID)}
                            >
                                Add Your First Subject
                            </PurpleButton>
                        </CardContent>
                    </StyledCard>
                ) : (
                    <StyledCard>
                        <CardContent>
                            <Box mb={3} display="flex" alignItems="center" gap={1}>
                                <BookIcon color="primary" sx={{ fontSize: 32 }} />
                                <Typography variant="h6">
                                    Class Subjects
                                </Typography>
                            </Box>
                            <TableTemplate 
                                buttonHaver={SubjectsButtonHaver} 
                                columns={subjectColumns} 
                                rows={subjectRows}
                            />
                        </CardContent>
                        <SpeedDialTemplate actions={subjectActions} />
                    </StyledCard>
                )}
            </motion.div>
        );
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'actions', label: 'Actions', minWidth: 170 },
    ];

    const studentRows = Array.isArray(sclassStudents) ? sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    })) : [];

    const StudentsButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="View Student">
                    <IconButton 
                        onClick={() => navigate("/Admin/students/student/" + row.id)}
                        sx={{ color: 'primary.main' }}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View Attendance">
                    <IconButton 
                        onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
                        sx={{ color: 'secondary.main' }}
                    >
                        <EventNoteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove Student">
                    <IconButton 
                        onClick={() => deleteHandler(row.id, "Student")}
                        sx={{ color: 'error.main' }}
                    >
                        <PersonRemoveIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />,
            name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {getresponse ? (
                    <StyledCard>
                        <CardContent sx={{ textAlign: 'center', py: 5 }}>
                            <Typography variant="h6" color="text.secondary" mb={2}>
                                No Students Enrolled Yet
                            </Typography>
                            <PurpleButton
                                variant="contained"
                                startIcon={<PersonAddAlt1Icon />}
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Your First Student
                            </PurpleButton>
                        </CardContent>
                    </StyledCard>
                ) : (
                    <StyledCard>
                        <CardContent>
                            <Box mb={3} display="flex" alignItems="center" gap={1}>
                                <GroupIcon color="primary" sx={{ fontSize: 32 }} />
                                <Typography variant="h6">
                                    Enrolled Students
                                </Typography>
                            </Box>
                            <TableTemplate 
                                buttonHaver={StudentsButtonHaver} 
                                columns={studentColumns} 
                                rows={studentRows}
                            />
                        </CardContent>
                        <SpeedDialTemplate actions={studentActions} />
                    </StyledCard>
                )}
            </motion.div>
        );
    };

    return (
        <PageContainer>
            <Container maxWidth="lg">
                {/* Header */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box display="flex" alignItems="center" mb={4}>
                                <Tooltip title="Go Back">
                                    <IconButton 
                                        onClick={() => navigate(-1)}
                                        sx={{ mr: 2, backgroundColor: 'white' }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Tooltip>
                                <Box>
                                    <Typography variant="h4" component="h1" fontWeight={600}>
                                        {sclassDetails?.sclassName || "Class Details"}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Manage class subjects and students
                                    </Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Content */}
                    <Grid item xs={12}>
                        {loading ? (
                            <Box sx={{ width: '100%', mt: 4 }}>
                                <LinearProgress />
                            </Box>
                        ) : (
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList 
                                        onChange={handleChange}
                                        sx={{
                                            '& .MuiTab-root': {
                                                minWidth: 'auto',
                                                px: 4,
                                                py: 2,
                                            }
                                        }}
                                    >
                                        <Tab 
                                            label={
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <BookIcon />
                                                    <span>Subjects</span>
                                                </Box>
                                            } 
                                            value="1"
                                        />
                                        <Tab 
                                            label={
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <GroupIcon />
                                                    <span>Students</span>
                                                </Box>
                                            }
                                            value="2"
                                        />
                                    </TabList>
                                </Box>
                                <TabPanel value="1" sx={{ px: 0 }}>
                                    <ClassSubjectsSection />
                                </TabPanel>
                                <TabPanel value="2" sx={{ px: 0 }}>
                                    <ClassStudentsSection />
                                </TabPanel>
                            </TabContext>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
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

const StyledCard = styled(Card)({
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    overflow: 'hidden'
});

export default ClassDetails;