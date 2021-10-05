import React, { Fragment, useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Component
import Loader from '../layout/Loader';

// Redux
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  updateUser,
  clearErrors,
  getUserDetails,
} from '../../redux/actions/userAction';
import { UPDATE_USER_RESET } from '../../redux/constants/userConstants';

const UpdateUser = ({ error, isUpdated, user, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const userId = router.query.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      router.push('/admin/users');
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, isUpdated, user, userId, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };
    dispatch(updateUser(user._id, userData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mt-2 mb-5'>Update User</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='name'
                    id='name_field'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='role_field'>Role</label>

                  <select
                    id='role_field'
                    className='form-control'
                    name='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value='user'>user</option>
                    <option value='admin'>admin</option>
                  </select>
                </div>

                <button
                  type='submit'
                  className='btn update-btn btn-block mt-4 mb-3'
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
  isUpdated: state.user.isUpdated,
  user: state.userDetails.user,
  loading: state.userDetails.loading,
});

export default connect(mapStateToProps)(UpdateUser);
