import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';

// Next
import { useRouter } from 'next/router';

// Component
import ButtonLoader from '../layout/ButtonLoader';
import Loader from '../layout/Loader';

// Redux
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { updateProfile, clearErrors } from '../../redux/actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';

const Profile = ({ updatedUser, loading, error, isUpdated, updateLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );

  useEffect(() => {
    if (updatedUser) {
      setUser({
        name: updatedUser.name,
        email: updatedUser.email,
      });
      setAvatarPreview(updatedUser.avatar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      router.push('/');
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, isUpdated, error, updatedUser]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      avatar,
    };

    dispatch(updateProfile(userData));
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
                <h1 className='mb-3'>Update Profile</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='text'
                    id='name_field'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password_field'>Password</label>
                  <input
                    type='password'
                    id='password_field'
                    className='form-control'
                    name='password'
                    value={password}
                    onChange={onChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='avatar_upload'>Avatar</label>
                  <div className='d-flex align-items-center'>
                    <div>
                      <figure className='avatar mr-3 item-rtl'>
                        <img
                          src={avatarPreview}
                          className='rounded-circle'
                          alt='image'
                        />
                      </figure>
                    </div>
                    <div className='custom-file'>
                      <input
                        type='file'
                        name='avatar'
                        className='custom-file-input'
                        accept='images/*'
                        id='customFile'
                        onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-3'
                  disabled={updateLoading ? true : false}
                >
                  {updateLoading ? <ButtonLoader /> : 'UPDATE'}
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
  updatedUser: state.loadedUser.user,
  loading: state.loadedUser.loading,
  error: state.user.error,
  isUpdated: state.user.isUpdated,
  updateLoading: state.user.loading,
});

export default connect(mapStateToProps)(Profile);
