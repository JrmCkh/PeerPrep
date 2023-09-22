import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateUsername } from '../../api/UserApi.js';
import { showValidationErrorToast, showSuccessToast, showFailureToast } from '../../utils/toast.js';

const EditUser = ({ user = null }) => {
  const [id, setId] = useState(null);
  const [newUsername, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  useEffect(() => {
    if (user) {
      // Used when routing from ManageUserProfile
      setId(user.id);
      setUsername(user.username);
    } else {
      // Used when routing from ManageUserProfiles
      setId(location.state.id);
      setUsername(location.state.username);
    }
    setIsLoading(false);
  }, [location.state, user]);

  const navigate = useNavigate();

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    try {
      await updateUsername(id, newUsername);
      navigate(-1);
      showSuccessToast('Username updated successfully!');
    } catch (error) {
      switch (error.response.status) {
        case 400:
          showValidationErrorToast(error);
          break;
        default:
          showFailureToast(error);
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBackClick = () => {
    navigate('../');
  };

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        <div className='col'>
          <nav aria-label='breadcrumb' className='bg-light rounded-3 p-3 mb-4'>
            <ol className='breadcrumb mb-0'>
              {!user ? (
                <li className='breadcrumb-item'>
                  <a href='/users-management'>Manage User Profiles</a>
                </li>
              ) : null}
              <li className='breadcrumb-item active' aria-current='page' style={{ fontWeight: 'bold' }}>
                Edit User Information
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <form className='edit-username needs-validation' onSubmit={handleUpdateClick} noValidate>
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='editUsername' placeholder='username' value={newUsername} onChange={handleUsernameChange} required />
          <label htmlFor='editUsername'>Username</label>
        </div>
        <div className='d-flex justify-content-between'>
          <button type="button" className="btn btn-secondary" onClick={handleBackClick}>
            Back
          </button>
          <button type='submit' className='btn btn-success'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
