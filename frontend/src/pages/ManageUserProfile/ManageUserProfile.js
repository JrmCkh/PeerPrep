import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header';
import EditUser from '../../components/User/EditUser';
import ChangeUserPassword from '../../components/User/ChangeUserPassword';
import { ViewUserTopPane, ViewUserBottomPane } from '../../components/User/ViewUser';
import { getUser } from '../../api/UserApi.js';
import { showValidationErrorToast, showServerErrorToast } from '../../utils/toast.js';
import { Grid, Container } from '@mui/material';

function ManageUserProfile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const fetchData = async () => {
      getUser(storedUser.id)
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          navigate(-1);
          if (error.response.status === 400) {
            showValidationErrorToast(error);
          } else {
            showServerErrorToast(error);
          }
        });
    };

    if (storedUser) {
      fetchData();
    } else {
      // No user session
      navigate('/login');
    }

    setIsLoading(false);
  }, [navigate, setUser]);

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div>
      <Header />
      <Container sx={{ marginTop: '20px' }}>
        <Grid>
          <ViewUserTopPane user={user} />
          <Routes>
            <Route path='/' element={<ViewUserBottomPane user={user} />} />
            <Route path='/edit' element={<EditUser user={user} />} />
            <Route path='/change-password' element={<ChangeUserPassword user={user} />} />
          </Routes>
        </Grid>
      </Container>
    </div>
  );
}

export default ManageUserProfile;