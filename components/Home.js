import React from 'react';
import { connect } from 'react-redux';
import RoomItem from './room/RoomItem';

const Home = ({ rooms }) => {
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
          rooms.map((room) => <RoomItem key={room.id} room={room} />)
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return { rooms: state.allRooms.rooms };
};

export default connect(mapStateToProps)(Home);
