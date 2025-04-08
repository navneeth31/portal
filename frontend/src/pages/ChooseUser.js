import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  Avatar,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container maxWidth="lg">
        <Box py={{ xs: 3, sm: 5, md: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            color: '#1a237e', 
            marginBottom: { xs: '1.5rem', sm: '2rem', md: '3rem' },
            fontWeight: 500,
            letterSpacing: '0.5px',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' }
          }}>
            GCTC Portal Management
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard onClick={() => navigateHandler("Admin")}>
                <StyledAvatar>
                  <AccountCircle fontSize="large" />
                </StyledAvatar>
                <StyledTitle>
                  Administrator
                </StyledTitle>
                <StyledDescription>
                  System administration and management portal
                </StyledDescription>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard onClick={() => navigateHandler("Student")}>
                <StyledAvatar>
                  <School fontSize="large" />
                </StyledAvatar>
                <StyledTitle>
                  Student Portal
                </StyledTitle>
                <StyledDescription>
                  Academic records and course management
                </StyledDescription>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard onClick={() => navigateHandler("Teacher")}>
                <StyledAvatar>
                  <Group fontSize="large" />
                </StyledAvatar>
                <StyledTitle>
                  Faculty Portal
                </StyledTitle>
                <StyledDescription>
                  Course management and student assessment
                </StyledDescription>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 12px 8px;
  }
`;

const StyledCard = styled(Paper)`
  padding: 2.5rem 2rem;
  text-align: center;
  border-radius: 12px;
  background: white;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  position: relative;
  top: 0;

  @media (max-width: 900px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
    margin-bottom: 0;
    min-height: 200px;
    justify-content: center;
  }

  &:hover {
    border-color: #1a237e;
    box-shadow: 0 10px 20px rgba(26, 35, 126, 0.15);
    transform: translateY(-8px);
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    background-color: #e8eaf6;
    color: #1a237e;
    margin-bottom: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 900px) {
      width: 70px;
      height: 70px;
      margin-bottom: 1.25rem;
    }

    @media (max-width: 600px) {
      width: 56px;
      height: 56px;
      margin-bottom: 1rem;
    }

    svg {
      font-size: 40px;
      @media (max-width: 900px) {
        font-size: 35px;
      }
      @media (max-width: 600px) {
        font-size: 28px;
      }
    }

    ${StyledCard}:hover & {
      background-color: #1a237e;
      color: white;
      transform: scale(1.1);
    }
  }
`;

const StyledTitle = styled.h2`
  color: #1a237e;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  @media (max-width: 900px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 0.35rem;
  }

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const StyledDescription = styled.p`
  color: #546e7a;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  letter-spacing: 0.2px;
  transition: all 0.3s ease;

  @media (max-width: 900px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    line-height: 1.3;
    max-width: 200px;
  }

  ${StyledCard}:hover & {
    color: #1a237e;
  }
`;