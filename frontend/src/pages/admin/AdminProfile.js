import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { 
    Box, Button, Container, Grid, Typography, Avatar,
    Card, CardContent, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, AdminPanelSettings as AdminIcon, Email as EmailIcon, Phone as PhoneIcon, School as SchoolIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { PurpleButton } from '../../components/buttonStyles';

const AdminProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        contact: currentUser?.contact || '',
        school: currentUser?.school || '',
    });

    const handleEditClick = () => {
        setEditMode(true);
        setFormData({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            contact: currentUser?.contact || '',
            school: currentUser?.school || '',
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        dispatch(updateUser(formData));
        setEditMode(false);
    };

    const handleDeleteAccount = () => {
        dispatch(deleteUser(currentUser._id));
        dispatch(authLogout());
        navigate('/');
    };

    return (
        <PageContainer>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* Profile Header */}
                    <Grid item xs={12}>
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ProfileHeader>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        sx={{
                                            width: { xs: 80, md: 100 },
                                            height: { xs: 80, md: 100 },
                                            bgcolor: 'primary.main',
                                            fontSize: { xs: '2rem', md: '2.5rem' }
                                        }}
                                    >
                                        {currentUser?.name?.charAt(0) || 'A'}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                            {currentUser?.name}
                                        </Typography>
                                        <Chip
                                            icon={<AdminIcon />}
                                            label="Administrator"
                                            color="primary"
                                            sx={{ fontWeight: 500 }}
                                        />
                                    </Box>
                                </Box>
                                {!editMode && (
                                    <PurpleButton
                                        startIcon={<EditIcon />}
                                        onClick={handleEditClick}
                                        variant="contained"
                                    >
                                        Edit Profile
                                    </PurpleButton>
                                )}
                            </ProfileHeader>
                        </motion.div>
                    </Grid>

                    {/* Profile Details */}
                    <Grid item xs={12}>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <StyledCard>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                        Profile Information
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <InfoField
                                                icon={<EmailIcon color="action" />}
                                                label="Email"
                                                value={formData.email}
                                                name="email"
                                                editMode={editMode}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InfoField
                                                icon={<PhoneIcon color="action" />}
                                                label="Contact"
                                                value={formData.contact}
                                                name="contact"
                                                editMode={editMode}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InfoField
                                                icon={<SchoolIcon color="action" />}
                                                label="Institution"
                                                value={formData.school}
                                                name="school"
                                                editMode={editMode}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    {editMode && (
                                        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                            <Button
                                                startIcon={<CancelIcon />}
                                                onClick={() => setEditMode(false)}
                                                variant="outlined"
                                                color="error"
                                            >
                                                Cancel
                                            </Button>
                                            <PurpleButton
                                                startIcon={<SaveIcon />}
                                                onClick={handleSubmit}
                                                variant="contained"
                                            >
                                                Save Changes
                                            </PurpleButton>
                                        </Box>
                                    )}
                                </CardContent>
                            </StyledCard>
                        </motion.div>
                    </Grid>

                    {/* Danger Zone */}
                    <Grid item xs={12}>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <StyledCard sx={{ bgcolor: 'error.lighter' }}>
                                <CardContent>
                                    <Typography variant="h6" color="error" sx={{ mb: 2, fontWeight: 600 }}>
                                        Danger Zone
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Once you delete your account, there is no going back. Please be certain.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => setOpenDialog(true)}
                                    >
                                        Delete Account
                                    </Button>
                                </CardContent>
                            </StyledCard>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteAccount} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
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

const ProfileHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
        flexDirection: 'column',
        gap: '1rem',
        textAlign: 'center',
        '& .MuiBox-root': {
            flexDirection: 'column',
            alignItems: 'center'
        }
    }
});

const StyledCard = styled(Card)({
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
});

const InfoField = ({ icon, label, value, editMode, name, onChange }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        {icon}
        <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            {editMode ? (
                <TextField
                    fullWidth
                    size="small"
                    name={name}
                    value={value}
                    onChange={onChange}
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                />
            ) : (
                <Typography variant="body1">
                    {value || 'Not specified'}
                </Typography>
            )}
        </Box>
    </Box>
);

export default AdminProfile;