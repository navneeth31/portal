import React, { useEffect, useState } from "react";
import { 
    Box, Container, Typography, TextField, Button, 
    CircularProgress, Card, CardContent, Grid,
    IconButton, Tooltip
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import {
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    School as SchoolIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { PurpleButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;
    const adminID = currentUser._id;
    const address = "Sclass";
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <PageContainer>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* Header */}
                    <Grid item xs={12}>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box display="flex" alignItems="center" mb={3}>
                                <Tooltip title="Go Back" arrow>
                                    <IconButton 
                                        onClick={() => navigate(-1)}
                                        sx={{ mr: 2, backgroundColor: 'white' }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Tooltip>
                                <Typography variant="h4" component="h1" fontWeight={600}>
                                    Create New Class
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Form Card */}
                    <Grid item xs={12} md={8} lg={6}>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <StyledCard>
                                <CardContent>
                                    <Box mb={4} display="flex" alignItems="center" gap={2}>
                                        <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                                        <div>
                                            <Typography variant="h6" fontWeight={600}>
                                                Class Information
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Enter the details for the new class
                                            </Typography>
                                        </div>
                                    </Box>

                                    <form onSubmit={submitHandler}>
                                        <TextField
                                            fullWidth
                                            label="Class Name"
                                            variant="outlined"
                                            value={sclassName}
                                            onChange={(event) => setSclassName(event.target.value)}
                                            required
                                            placeholder="Enter class name"
                                            sx={{ mb: 3 }}
                                            InputProps={{
                                                startAdornment: <AddIcon color="action" sx={{ mr: 1 }} />,
                                            }}
                                        />

                                        <Box display="flex" gap={2}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => navigate(-1)}
                                                startIcon={<ArrowBackIcon />}
                                                sx={{ flex: 1 }}
                                            >
                                                Cancel
                                            </Button>
                                            <PurpleButton
                                                type="submit"
                                                disabled={loader}
                                                variant="contained"
                                                sx={{ flex: 1 }}
                                            >
                                                {loader ? (
                                                    <CircularProgress size={24} color="inherit" />
                                                ) : (
                                                    <>
                                                        <AddIcon sx={{ mr: 1 }} />
                                                        Create Class
                                                    </>
                                                )}
                                            </PurpleButton>
                                        </Box>
                                    </form>
                                </CardContent>
                            </StyledCard>
                        </motion.div>
                    </Grid>

                    {/* Info Card */}
                    <Grid item xs={12} md={4} lg={6}>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <InfoCard>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600} mb={2}>
                                        About Class Creation
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        Creating a new class in the university portal allows you to:
                                    </Typography>
                                    <ul style={{ paddingLeft: '1.5rem', color: '#666' }}>
                                        <li>Organize students into specific academic groups</li>
                                        <li>Manage class-specific curricula and schedules</li>
                                        <li>Track attendance and performance metrics</li>
                                        <li>Facilitate communication between faculty and students</li>
                                    </ul>
                                </CardContent>
                            </InfoCard>
                        </motion.div>
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
    background: '#ffffff',
});

const InfoCard = styled(Card)({
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    background: '#ffffff',
    height: '100%',
    '& ul': {
        margin: 0,
        '& li': {
            marginBottom: '0.5rem',
            '&:last-child': {
                marginBottom: 0
            }
        }
    }
});

export default AddClass;