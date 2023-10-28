import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { DeregisterWindow } from '../ConfirmationWindows';
import { deleteUser } from '../../api/UserApi';
import { showSuccessToast } from '../../utils/toast';
import { errorHandler } from '../../utils/errors';
import { getCookie } from '../../utils/helpers';
import { Grid, Card, Box, Typography, Button } from '@mui/material';

export const ViewUserTopPane = ({ user }) => {
  const [isDeregisterWindowOpen, setDeregisterWindowOpen] = useState(false);

  const navigate = useNavigate();

  const handleViewProfileClick = () => {
    navigate('/user-profile/');
  };

  const handleChangePasswordClick = () => {
    navigate('/user-profile/change-password/', { state: { user: user } });
  };

  const handleDeregisterClick = () => {
    setDeregisterWindowOpen(true);
  };

  const handleDeregisterConfirm = async () => {
    setDeregisterWindowOpen(false);
    try {
      await deleteUser(user.id, getCookie());
      showSuccessToast('User has been deleted successfully!');
      Cookies.remove('jwt');
      navigate('/');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeregisterCancel = () => {
    setDeregisterWindowOpen(false);
  };

  return (
    <Card sx={{ marginBottom: '10px' }}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        padding={2}>
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
          {user.displayName}
        </Typography>
        <Typography variant='string'>{user.email}</Typography>
        <Box m={2} justifyContent='center'>
          <Button variant='contained' onClick={handleViewProfileClick}>
            View Profile
          </Button>
          <Button variant='contained' onClick={handleChangePasswordClick}>
            Change Password
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={handleDeregisterClick}>
            Deregister
          </Button>
        </Box>
      </Box>
      {isDeregisterWindowOpen && (
        <DeregisterWindow
          onConfirm={handleDeregisterConfirm}
          onClose={handleDeregisterCancel}
        />
      )}
    </Card>
  );
};

export const ViewUserBottomPane = ({ user }) => {
  const navigate = useNavigate();

  const handleEditDisplayNameClick = () => {
    navigate('/user-profile/edit/', { state: { user: user } });
  };

  return (
    <Grid item>
      <Card sx={{ marginBottom: '10px' }}>
        <Box padding={2}>
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                Display Name
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='string'>{user.displayName}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button variant='contained' onClick={handleEditDisplayNameClick}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Card sx={{ marginBottom: '10px' }}>
        <Box padding={2}>
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='string'>{user.email}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};
