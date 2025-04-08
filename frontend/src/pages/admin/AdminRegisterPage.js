/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Button, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg"
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

const AdminRegisterPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

  const [toggle, setToggle] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const role = "Admin"

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role, schoolName }
    setLoader(true)
    dispatch(registerUser(fields, role))
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'adminName') setAdminNameError(false);
    if (name === 'schoolName') setSchoolNameError(false);
  };

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      navigate('/Admin/dashboard');
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      console.log(error)
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ minHeight: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: '#fff'
          }}>
          <Box
            sx={{
              my: { xs: 3, md: 6 },
              mx: { xs: 2, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              bgcolor: '#fff',
            }}
          >
            <Typography variant="h4"
              sx={{
                mb: 1,
                color: "#1a237e",
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}>
              Admin Registration
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, color: '#666', textAlign: 'center' }}>
              Register as an administrator to manage your institution
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="adminName"
                label="Full Name"
                name="adminName"
                autoComplete="name"
                autoFocus
                error={adminNameError}
                helperText={adminNameError && 'Name is required'}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="schoolName"
                label="Institution Name"
                name="schoolName"
                autoComplete="off"
                error={schoolNameError}
                helperText={schoolNameError && 'Institution name is required'}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailError && 'Email is required'}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
                onChange={handleInputChange}
                sx={textFieldStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setToggle(!toggle)}
                        edge="end"
                        sx={{ color: '#666' }}
                      >
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="agree"
                    color="primary"
                    sx={{
                      color: '#1a237e',
                      '&.Mui-checked': {
                        color: '#1a237e',
                      },
                    }}
                  />
                }
                label="I agree to the terms and conditions"
                sx={{ mt: 1, color: '#666' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#1a237e',
                  color: '#fff',
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#0d1b6d',
                  },
                }}
              >
                {loader ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Create Account"}
              </Button>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <StyledLink to="/Adminlogin">
                    Sign in
                  </StyledLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.8)), url(${bgpic})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#1a237e',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', sm: 'block' },
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#fff',
              p: 4,
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, letterSpacing: '-0.5px' }}>
              GCTC Portal
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', opacity: 0.9 }}>
              Empowering education through modern technology
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  color: #1a237e;
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#1a237e',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1a237e',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    '&.Mui-focused': {
      color: '#1a237e',
    },
  },
};
