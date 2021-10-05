import React, { Fragment, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';

// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Loader from '../layout/Loader';

// Redux
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
  getAdminUsers,
  deleteUser,
  clearErrors,
} from '../../redux/actions/userAction';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

const AllUsers = ({ loading, error, users, isDeleted, deleteError }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push('/admin/users');
      dispatch({
        type: DELETE_USER_RESET,
      });
    }
  }, [dispatch, error, isDeleted]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <Fragment>
              <Link href={`/admin/users/${user._id}`}>
                <a className='btn btn-primary'>
                  <i className='fa fa-pencil'></i>
                </a>
              </Link>

              <button
                className='btn btn-danger mx-2'
                onClick={() => deleteRoomHandler(user._id)}
              >
                <i className='fa fa-trash'></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  const deleteRoomHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className='container container-fluid'>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className='my-5'>{`${users && users.length} Users`}</h1>
          <MDBDataTable
            data={setUsers()}
            className='px-3'
            bordered
            striped
            hover
          />
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.allRooms.loading,
  error: state.allRooms.error,
  users: state.allUsers.users,
  isDeleted: state.user.isDeleted,
  deleteError: state.user.error,
});

export default connect(mapStateToProps)(AllUsers);
