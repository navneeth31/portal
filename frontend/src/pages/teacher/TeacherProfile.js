import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Container, Box, Typography, Avatar, Grid, 
  Chip, Card, CardContent 
} from '@mui/material';
import { useSelector } from 'react-redux';
import { 
  School as SchoolIcon,
  Class as ClassIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileHeader>
                <Avatar
                  sx={{
                    width: { xs: 100, md: 120 },
                    height: { xs: 100, md: 120 },
                    bgcolor: 'primary.main',
                    fontSize: { xs: '2.5rem', md: '3rem' }
                  }}
                >
                  {currentUser.name.charAt(0)}
                </Avatar>
                <Box sx={{ ml: { xs: 2, md: 3 } }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 1
                  }}>
                    {currentUser.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<SchoolIcon />}
                      label="Faculty"
                      color="primary"
                      sx={{ fontWeight: 500 }}
                    />
                    <Chip
                      icon={<BookIcon />}
                      label={teachSubject.subName}
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </Box>
              </ProfileHeader>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <PersonIcon color="primary" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Full Name
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {currentUser.name}
                          </Typography>
                        </Box>
                      </InfoItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <EmailIcon color="primary" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {currentUser.email}
                          </Typography>
                        </Box>
                      </InfoItem>
                    </Grid>
                    {currentUser.phone && (
                      <Grid item xs={12} sm={6}>
                        <InfoItem>
                          <PhoneIcon color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Phone
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {currentUser.phone}
                            </Typography>
                          </Box>
                        </InfoItem>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Academic Details
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Institution
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {teachSchool.schoolName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Subject
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {teachSubject.subName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Class
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<ClassIcon />}
                          label={teachSclass.sclassName}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>
        </Grid>
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

const ProfileHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '2rem',
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
  '@media (max-width: 600px)': {
    padding: '1.5rem',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& .MuiBox-root': {
      marginLeft: '0 !important',
      marginTop: '1rem'
    }
  }
});

const StyledCard = styled(Card)({
  height: '100%',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
  '& .MuiCardContent-root': {
    height: '100%'
  }
});

const InfoItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  '& .MuiSvgIcon-root': {
    marginTop: '4px'
  }
});

const Stack = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
});

export default TeacherProfile;