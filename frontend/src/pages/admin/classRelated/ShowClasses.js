/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { 
    IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip,
    Container, Typography, Grid, Card, CardContent,
    LinearProgress
} from '@mui/material';
import {
    Delete as DeleteIcon,
    PostAdd as PostAddIcon,
    PersonAddAlt1 as PersonAddAlt1Icon,
    AddCard as AddCardIcon,
    School as SchoolIcon,
    MoreVert as MoreVertIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { studentsList } = useSelector((state) => state.student);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;
    const [showPopup, setShowPopup] = useState(false);
    const [message] = useState("");

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllStudents(adminID));
        dispatch(getSubjectList(adminID, "AllSubjects"));
    }, [adminID, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllSclasses(adminID, "Sclass"));
                dispatch(getAllStudents(adminID));
                dispatch(getSubjectList(adminID, "AllSubjects"));
            });
    };

    // Get student count for each class
    const getStudentCount = (classId) => {
        if (!Array.isArray(studentsList)) return 0;
        return studentsList.filter(student => 
            student.sclassName && student.sclassName._id === classId
        ).length;
    };

    // Get subject count for each class
    const getSubjectCount = (classId) => {
        if (!Array.isArray(subjectsList)) return 0;
        return subjectsList.filter(subject => 
            subject.sclassName && subject.sclassName._id === classId
        ).length;
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
        { id: 'students', label: 'Students', minWidth: 100 },
        { id: 'subjects', label: 'Subjects', minWidth: 100 },
        { id: 'actions', label: 'Actions', minWidth: 170 },
    ];

    const sclassRows = (sclassesList && sclassesList.length > 0) ? sclassesList.map((sclass) => ({
        name: sclass.sclassName,
        students: getStudentCount(sclass._id),
        subjects: getSubjectCount(sclass._id),
        id: sclass._id,
    })) : [];

    const SclassButtonHaver = ({ row }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const actions = [
            { 
                icon: <PostAddIcon />, 
                name: 'Add Subjects', 
                action: () => navigate("/Admin/addsubject/" + row.id),
                color: 'primary' 
            },
            { 
                icon: <PersonAddAlt1Icon />, 
                name: 'Add Student', 
                action: () => navigate("/Admin/class/addstudents/" + row.id),
                color: 'success'
            },
            {
                icon: <DeleteIcon />,
                name: 'Delete Students',
                action: () => {
                    const studentsToDelete = studentsList.filter(student => 
                        student.sclassName && student.sclassName._id === row.id
                    );
                    studentsToDelete.forEach(student => {
                        deleteHandler(student._id, "Student");
                    });
                    handleClose();
                },
                color: 'error'
            },
            {
                icon: <DeleteIcon />,
                name: 'Delete Subjects',
                action: () => {
                    const subjectsToDelete = subjectsList.filter(subject => 
                        subject.sclassName && subject.sclassName._id === row.id
                    );
                    subjectsToDelete.forEach(subject => {
                        deleteHandler(subject._id, "Subject");
                    });
                    handleClose();
                },
                color: 'error'
            }
        ];

        return (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="View Class">
                    <IconButton 
                        onClick={() => navigate("/Admin/classes/class/" + row.id)}
                        sx={{ color: 'primary.main' }}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {actions.map((action) => (
                        <MenuItem
                            key={action.name}
                            onClick={action.action}
                            sx={{ 
                                color: action.color ? `${action.color}.main` : 'inherit',
                                '&:hover': {
                                    backgroundColor: action.color ? `${action.color}.lighter` : undefined
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: action.color ? `${action.color}.main` : 'inherit' }}>
                                {action.icon}
                            </ListItemIcon>
                            {action.name}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        );
    };

    const actions = [
        {
            icon: <AddCardIcon color="primary" />,
            name: 'Add New Class',
            action: () => navigate("/Admin/addclass")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Classes',
            action: () => deleteHandler(adminID, "Sclasses")
        },
    ];

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
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                                    <div>
                                        <Typography variant="h4" component="h1" fontWeight={600}>
                                            Classes
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Manage all university classes
                                        </Typography>
                                    </div>
                                </Box>
                                <PurpleButton
                                    variant="contained"
                                    startIcon={<AddCardIcon />}
                                    onClick={() => navigate("/Admin/addclass")}
                                >
                                    Add New Class
                                </PurpleButton>
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Content */}
                    <Grid item xs={12}>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {loading ? (
                                <Box sx={{ width: '100%', mt: 4 }}>
                                    <LinearProgress />
                                </Box>
                            ) : getresponse ? (
                                <StyledCard>
                                    <CardContent sx={{ textAlign: 'center', py: 5 }}>
                                        <Typography variant="h6" color="text.secondary" mb={2}>
                                            No Classes Found
                                        </Typography>
                                        <PurpleButton
                                            variant="contained"
                                            startIcon={<AddCardIcon />}
                                            onClick={() => navigate("/Admin/addclass")}
                                        >
                                            Add Your First Class
                                        </PurpleButton>
                                    </CardContent>
                                </StyledCard>
                            ) : (
                                Array.isArray(sclassesList) && sclassesList.length > 0 && (
                                    <StyledCard>
                                        <TableTemplate 
                                            buttonHaver={SclassButtonHaver} 
                                            columns={sclassColumns} 
                                            rows={sclassRows}
                                        />
                                    </StyledCard>
                                )
                            )}
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
            <SpeedDialTemplate actions={actions} />
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

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
};

export default ShowClasses;