import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';

import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getRoomReviews, clearErrors } from '../../redux/actions/roomActions';
// import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

const RoomReviews = ({ loading, error, reviews }) => {
  const [roomId, setRoomId] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (roomId !== '') {
      dispatch(getRoomReviews(roomId));
    }

    // if (deleteError) {
    //   toast.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   router.push('/admin/users');
    //   dispatch({
    //     type: DELETE_USER_RESET,
    //   });
    // }
  }, [dispatch, error, roomId]);

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
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

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <button className='btn btn-danger mx-2'>
              <i className='fa fa-trash'></i>
            </button>
          ),
        });
      });

    return data;
  };

  //   const deleteRoomHandler = (id) => {
  //     dispatch(deleteUser(id));
  //   };

  return (
    <div className='container container-fluid'>
      <div className='row justify-content-center mt-5'>
        <div className='col-5'>
          <form>
            <div className='form-group'>
              <label htmlFor='roomId_field'>Enter Room Id</label>
              <input
                type='text'
                id='roomId_field'
                className='form-control'
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {reviews && reviews.length === 0 ? (
        <div className='alert alert-danger mt-5 text-center'>No Reviews</div>
      ) : (
        <MDBDataTable
          data={setReviews()}
          className='px-3'
          bordered
          striped
          hover
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.roomReviews.loading,
  error: state.roomReviews.error,
  reviews: state.roomReviews.reviews,
  //   isDeleted: state.user.isDeleted,
  //   deleteError: state.user.error,
});

export default connect(mapStateToProps)(RoomReviews);
