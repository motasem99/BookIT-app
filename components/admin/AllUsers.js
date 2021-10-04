import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';

import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getAdminUsers, clearErrors } from '../../redux/actions/userAction';
// import { DELETE_ROOM_RESET } from '../../redux/constants/roomConstants';

const AllUsers = ({ loading, error, users, deleteError, isDeleted }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // if (deleteError) {
    //   toast.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   router.push('/admin/rooms');
    //   dispatch({
    //     type: DELETE_ROOM_RESET,
    //   });
    // }
  }, [dispatch]);

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

              <button className='btn btn-danger mx-2'>
                <i className='fa fa-trash'></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  //   const deleteRoomHandler = (id) => {
  //     dispatch(deleteRoom(id));
  //   };

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
  //   deleteError: state.room.error,
  //   isDeleted: state.room.isDeleted,
});

export default connect(mapStateToProps)(AllUsers);
