import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RoomItem from './room/RoomItem';
import { toast } from 'react-toastify';

const Home = ({ rooms, error }) => {
  useEffect(() => {
    toast.error(error);
  }, []);

  return (
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
  );
};

const mapStateToProps = (state) => {
  return { rooms: state.allRooms.rooms, error: state.allRooms.error };
};

export default connect(mapStateToProps)(Home);
