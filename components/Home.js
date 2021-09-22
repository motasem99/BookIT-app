import React, { Fragment, useEffect } from 'react';
import RoomItem from './room/RoomItem';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../redux/actions/roomActions';

const Home = ({ rooms, error, resPerPage, roomsCount, filteredRoomsCount }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { page = 1 } = router.query;
  page = Number(page);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, []);

  const handlePagination = (pageNumber) => {
    window.location.href = `/?page=${pageNumber}`;
  };
  return (
    <Fragment>
      <section id='rooms' className='container mt-5'>
        <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

        <a href='#' className='ml-2 back-to-search'>
          {' '}
          <i className='fa fa-arrow-left'></i> Back to Search
        </a>
        <div className='row'>
          {rooms && rooms.length === 0 ? (
            <div className='alert alert-danger'>No Rooms Found.</div>
          ) : (
            rooms && rooms.map((room) => <RoomItem key={room.id} room={room} />)
          )}
        </div>
      </section>

      {resPerPage < roomsCount && (
        <div className='d-flex justify-content-center mt-5'>
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handlePagination}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  rooms: state.allRooms.rooms,
  resPerPage: state.allRooms.resPerPage,
  roomsCount: state.allRooms.roomsCount,
  filteredRoomsCount: state.allRooms.filteredRoomsCount,
  error: state.allRooms.error,
});

export default connect(mapStateToProps)(Home);
