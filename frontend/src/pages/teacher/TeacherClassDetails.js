/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import TableTemplate from "../../components/TableTemplate";
import { 
    Paper, Box, Typography, ButtonGroup, Button, Popper, Grow, 
    ClickAwayListener, MenuList, MenuItem, Container, Grid, 
    Skeleton, Card, CardContent, Avatar, Chip, Divider 
} from '@mui/material';
import { 
    Person as PersonIcon,
    School as SchoolIcon,
    Assignment as AssignmentIcon,
    CalendarToday as CalendarIcon,
    KeyboardArrowDown, 
    KeyboardArrowUp 
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const studentColumns = [
        { 
            id: 'name', 
            label: 'Student Name', 
            minWidth: 170,
            renderCell: (row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StyledAvatar>{row.name.charAt(0)}</StyledAvatar>
                    <Typography variant="body2" sx={{ 
                        '@media (max-width: 600px)': {
                            fontSize: '0.75rem'
                        }
                    }}>
                        {row.name}
                    </Typography>
                </Box>
            )
        },
        { 
            id: 'rollNum', 
            label: 'Roll Number', 
            minWidth: 100,
            renderCell: (row) => (
                <Typography variant="body2" sx={{ 
                    '@media (max-width: 600px)': {
                        fontSize: '0.75rem'
                    }
                }}>
                    {row.rollNum}
                </Typography>
            )
        },
    ];

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
        };

        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <ButtonContainer>
                <ViewButton
                    variant="contained"
                    onClick={() => navigate("/Teacher/class/student/" + row.id)}
                    startIcon={<PersonIcon />}
                >
                    View Profile
                </ViewButton>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="action buttons">
                    <ActionButton onClick={handleClick}>
                        {selectedIndex === 0 ? <CalendarIcon sx={{ mr: 1 }} /> : <AssignmentIcon sx={{ mr: 1 }} />}
                        {options[selectedIndex]}
                    </ActionButton>
                    <DropdownButton
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select action"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </DropdownButton>
                </ButtonGroup>
                <StyledPopper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <MenuPaper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {index === 0 ? <CalendarIcon sx={{ mr: 1 }} /> : <AssignmentIcon sx={{ mr: 1 }} />}
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </MenuPaper>
                        </Grow>
                    )}
                </StyledPopper>
            </ButtonContainer>
        );
    };

    const renderLoading = () => (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                {[1, 2, 3].map((item) => (
                    <Grid item xs={12} key={item}>
                        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    const renderNoStudents = () => (
        <StyledCard>
            <CardContent sx={{ textAlign: 'center', py: 5 }}>
                <SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Students Found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    There are currently no students enrolled in this class.
                </Typography>
            </CardContent>
        </StyledCard>
    );

    return (
        <PageContainer>
            <Container maxWidth="lg">
                <PageHeader
                    component={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        <div>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                Class Details
                            </Typography>
                            {/* <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                {currentUser.teachSclass?.name} - {currentUser.teachSubject?.name}
                            </Typography> */}
                        </div>
                    </Box>
                    <Divider sx={{ mb: 4 }} />
                </PageHeader>

                {loading ? (
                    renderLoading()
                ) : (
                    <>
                        {getresponse ? (
                            renderNoStudents()
                        ) : (
                            <StyledPaper elevation={0}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                                        Students List
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Manage your class students, track attendance, and provide marks
                                    </Typography>
                                </Box>

                                <Box sx={{ 
                                    overflowX: 'auto', 
                                    '-webkit-overflow-scrolling': 'touch',
                                    '& .MuiTable-root': {
                                        minWidth: {
                                            xs: '600px',
                                            sm: '100%'
                                        }
                                    },
                                    '& .MuiTableCell-root': {
                                        whiteSpace: 'nowrap',
                                        px: { xs: 2, sm: 3 },
                                        py: { xs: 1.5, sm: 2 },
                                        '&:first-of-type': {
                                            pl: { xs: 2, sm: 3 }
                                        },
                                        '&:last-of-type': {
                                            pr: { xs: 2, sm: 3 }
                                        }
                                    },
                                    '& .MuiTableRow-root': {
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    },
                                    '& .MuiTableHead-root': {
                                        '& .MuiTableCell-root': {
                                            backgroundColor: 'background.paper',
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '1rem'
                                            },
                                            fontWeight: 600
                                        }
                                    },
                                    '& .MuiTableBody-root': {
                                        '& .MuiTableCell-root': {
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '1rem'
                                            }
                                        }
                                    }
                                }}>
                                    {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                                        <TableTemplate 
                                            buttonHaver={StudentsButtonHaver} 
                                            columns={studentColumns} 
                                            rows={studentRows}
                                        />
                                    )}
                                </Box>
                            </StyledPaper>
                        )}
                    </>
                )}
            </Container>
        </PageContainer>
    );
};

// Styled Components
const PageContainer = styled('div')({
    minHeight: '100vh',
    padding: '2rem 0',
    background: '#f8fafc',
    '@media (max-width: 600px)': {
        padding: '1rem 0'
    }
});

const PageHeader = styled(Box)({
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
        marginBottom: '1.5rem',
        '& .MuiTypography-h4': {
            fontSize: '1.5rem'
        },
        '& .MuiTypography-subtitle1': {
            fontSize: '0.875rem'
        }
    }
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.05)',
    '@media (max-width: 600px)': {
        padding: theme.spacing(2),
        '& .MuiTypography-h6': {
            fontSize: '1.125rem'
        },
        '& .MuiTypography-body2': {
            fontSize: '0.875rem'
        }
    }
}));

const StyledCard = styled(Card)({
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    '@media (max-width: 600px)': {
        '& .MuiTypography-h6': {
            fontSize: '1rem'
        },
        '& .MuiTypography-body2': {
            fontSize: '0.75rem'
        }
    }
});

const ButtonContainer = styled(Box)({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
        gap: '4px',
        justifyContent: 'flex-start',
        '& > button': {
            minWidth: 'auto'
        }
    }
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 35,
    height: 35,
    backgroundColor: theme.palette.primary.main,
    fontSize: '1rem',
    '@media (max-width: 600px)': {
        width: 30,
        height: 30,
        fontSize: '0.875rem',
    }
}));

const ViewButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)',
    padding: '6px 12px',
    minWidth: 'auto',
    textTransform: 'none',
    '@media (max-width: 600px)': {
        padding: '4px 8px',
        fontSize: '0.75rem',
        '& .MuiSvgIcon-root': {
            fontSize: '1rem',
            marginRight: '4px'
        }
    },
    '&:hover': {
        background: 'linear-gradient(45deg, #1976D2 30%, #00B8D4 90%)',
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)',
    padding: '6px 12px',
    minWidth: 'auto',
    textTransform: 'none',
    '@media (max-width: 600px)': {
        padding: '4px 8px',
        fontSize: '0.75rem',
        '& .MuiSvgIcon-root': {
            fontSize: '1rem',
            marginRight: '4px'
        }
    },
    '&:hover': {
        background: 'linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)',
    },
}));

const DropdownButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
    color: 'white',
    minWidth: '32px',
    padding: '6px',
    '@media (max-width: 600px)': {
        padding: '4px',
        minWidth: '28px',
        '& .MuiSvgIcon-root': {
            fontSize: '1rem'
        }
    },
    '&:hover': {
        background: 'linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)',
    },
}));

const MenuPaper = styled(Paper)({
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    borderRadius: 8,
    '& .MuiMenuItem-root': {
        padding: '6px 12px',
        fontSize: '0.875rem',
        '@media (max-width: 600px)': {
            padding: '4px 8px',
            fontSize: '0.75rem'
        }
    }
});

const StyledPopper = styled(Popper)({
    zIndex: 1100,
});

export default TeacherClassDetails;