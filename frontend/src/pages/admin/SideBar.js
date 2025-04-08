import * as React from 'react';
import { Box, Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, Tooltip, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StyledSideBar = styled(Box)(({ theme }) => ({
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    '&:hover': {
        borderRight: '1px solid rgba(0, 0, 0, 0.15)',
    }
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    margin: '4px 8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        transform: 'translateX(4px)',
    },
    '&.Mui-selected': {
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.12)',
        }
    }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: '40px',
    '& svg': {
        fontSize: '1.3rem',
        transition: 'transform 0.2s ease',
    },
    '.MuiListItemButton-root:hover &': {
        '& svg': {
            transform: 'scale(1.1)',
        }
    }
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    margin: 0,
    '& .MuiTypography-root': {
        fontSize: '0.9rem',
        fontWeight: 500,
    }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: '12px 0',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    background: 'transparent',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '0.75rem',
    lineHeight: '1.5',
    padding: '16px 24px 4px',
}));

const SideBar = () => {
    const location = useLocation();

    const isSelected = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Admin/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <StyledSideBar>
            <Box sx={{ pt: 2, pb: 1 }}>
                <Typography variant="h6" sx={{ px: 3, mb: 2, fontWeight: 600, fontSize: '1.1rem' }}>
                    University Admin
                </Typography>
                <Box>
                    <Tooltip title="Home" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/"
                            selected={isSelected('/')}
                        >
                            <StyledListItemIcon>
                                <HomeIcon color={isSelected('/') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Home" />
                        </StyledListItemButton>
                    </Tooltip>

                    <Tooltip title="Classes" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/Admin/classes"
                            selected={isSelected('/Admin/classes')}
                        >
                            <StyledListItemIcon>
                                <ClassOutlinedIcon color={isSelected('/Admin/classes') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Classes" />
                        </StyledListItemButton>
                    </Tooltip>

                    <Tooltip title="Subjects" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/Admin/subjects"
                            selected={isSelected('/Admin/subjects')}
                        >
                            <StyledListItemIcon>
                                <AssignmentIcon color={isSelected('/Admin/subjects') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Subjects" />
                        </StyledListItemButton>
                    </Tooltip>

                    <Tooltip title="Teachers" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/Admin/teachers"
                            selected={isSelected('/Admin/teachers')}
                        >
                            <StyledListItemIcon>
                                <SupervisorAccountOutlinedIcon color={isSelected('/Admin/teachers') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Teachers" />
                        </StyledListItemButton>
                    </Tooltip>

                    <Tooltip title="Students" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/Admin/students"
                            selected={isSelected('/Admin/students')}
                        >
                            <StyledListItemIcon>
                                <PersonOutlineIcon color={isSelected('/Admin/students') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Students" />
                        </StyledListItemButton>
                    </Tooltip>

                    <Tooltip title="Notices" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/Admin/notices"
                            selected={isSelected('/Admin/notices')}
                        >
                            <StyledListItemIcon>
                                <AnnouncementOutlinedIcon color={isSelected('/Admin/notices') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Notices" />
                        </StyledListItemButton>
                    </Tooltip>

                    <Tooltip title="Complains" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/Admin/complains"
                            selected={isSelected('/Admin/complains')}
                        >
                            <StyledListItemIcon>
                                <ReportIcon color={isSelected('/Admin/complains') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Complains" />
                        </StyledListItemButton>
                    </Tooltip>
                </Box>

                <StyledDivider />

                <StyledListSubheader>
                    User Settings
                </StyledListSubheader>

                <Box>
                    <Tooltip title="Profile" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/Admin/profile"
                            selected={isSelected('/Admin/profile')}
                        >
                            <StyledListItemIcon>
                                <AccountCircleOutlinedIcon color={isSelected('/Admin/profile') ? 'primary' : 'inherit'} />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Profile" />
                        </StyledListItemButton>
                    </Tooltip>

                    <Tooltip title="Logout" placement="right" arrow>
                        <StyledListItemButton
                            component={Link}
                            to="/logout"
                            selected={isSelected('/logout')}
                            sx={{ color: 'error.main' }}
                        >
                            <StyledListItemIcon sx={{ color: 'inherit' }}>
                                <ExitToAppIcon color="inherit" />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Logout" />
                        </StyledListItemButton>
                    </Tooltip>
                </Box>
            </Box>
        </StyledSideBar>
    );
};

export default SideBar;
