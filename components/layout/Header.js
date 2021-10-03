import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/actions/userAction';
import { signOut } from 'next-auth/client';

const Header = ({ user, loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className='navbar row justify-content-center sticky-top'>
      <div className='container'>
        <div className='col-3 p-0'>
          <div className='navbar-brand'>
            <Link href='/'>
              <img
                style={{ cursor: 'pointer' }}
                src='/images/bookit_logo.png'
                alt='BookIT'
              />
            </Link>
          </div>
        </div>

        <div className='col-3 mt-3 mt-md-0 text-center'>
          {user ? (
            <div className='ml-4 dropdown d-line'>
              <a
                className='btn dropdown-toggle mr-4'
                id='dropDownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <figure className='avatar avatar-nav'>
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className='rounded-circle'
                  />
                </figure>
                <span>{user && user.name} </span>
              </a>

              <div
                className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'
              >
                {user.role === 'admin' && (
                  <Fragment>
                    <Link href='/admin/rooms'>
                      <a className='dropdown-item'>Rooms</a>
                    </Link>

                    <Link href='/admin/bookings'>
                      <a className='dropdown-item'>Bookings</a>
                    </Link>
                    <hr />
                  </Fragment>
                )}
                <Link href='/bookings/me'>
                  <a className='dropdown-item'>My Bookings</a>
                </Link>

                <Link href='/me/update'>
                  <a className='dropdown-item'>Profile</a>
                </Link>

                <Link href='/'>
                  <a
                    className='dropdown-item text-danger'
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href='/login'>
                <a className='btn btn-danger px-4 text-white login-header-btn float-right'>
                  Login
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.loadedUser.user,
  loading: state.loadedUser.loading,
});

export default connect(mapStateToProps)(Header);
