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
import { clearErrors } from '../../redux/actions/bookingAction';
import { getAdminRooms, deleteRoom } from '../../redux/actions/roomActions';
import { DELETE_ROOM_RESET } from '../../redux/constants/roomConstants';

const AllRooms = ({ loading, error, rooms, deleteError, isDeleted }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAdminRooms());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push('/admin/rooms');
      dispatch({
        type: DELETE_ROOM_RESET,
      });
    }
  }, [dispatch, isDeleted, deleteError]);

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: 'Room ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price / Night',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
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

    rooms &&
      rooms.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <Fragment>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className='btn btn-primary'>
                  <i className='fa fa-pencil'></i>
                </a>
              </Link>

              <button
                className='btn btn-danger mx-2'
                onClick={() => deleteRoomHandler(room._id)}
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
    dispatch(deleteRoom(id));
  };

  return (
    <div className='container container-fluid'>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className='my-5'>
            {`${rooms && rooms.length} Rooms`}
            <Link href='/admin/rooms/new'>
              <a className='mt-0 btn text-white float-right new-room-btn'>
                Create Room
              </a>
            </Link>
          </h1>
          <MDBDataTable
            data={setRooms()}
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
  rooms: state.allRooms.rooms,
  deleteError: state.room.error,
  isDeleted: state.room.isDeleted,
});

export default connect(mapStateToProps)(AllRooms);
