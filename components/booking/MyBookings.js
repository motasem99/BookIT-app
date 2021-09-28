import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../../redux/actions/bookingAction';
import { MDBDataTable } from 'mdbreact';

const MyBookings = ({ bookings, error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: 'booking ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Check In',
          field: 'checkIn',
          sort: 'asc',
        },
        {
          label: 'Check Out',
          field: 'checkOut',
          sort: 'asc',
        },
        {
          label: 'Amount Paid',
          field: 'amount',
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

    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
          checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
          amount: `$${booking.amountPaid}`,
          actions: (
            <Fragment>
              <Link href={`/bookings/${booking._id}`}>
                <a className='btn btn-primary'>
                  <i className='fa fa-eye'></i>
                </a>
              </Link>

              <button className='btn btn-success mx-2'>
                <i className='fa fa-download'></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  return (
    <div className='container container-fluid'>
      <h1 className='my-5'>My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className='px-3'
        bordered
        striped
        hover
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  bookings: state.bookings.bookings,
  error: state.bookings.error,
});

export default connect(mapStateToProps)(MyBookings);
