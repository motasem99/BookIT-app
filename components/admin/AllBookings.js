import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../layout/Loader';

import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clearErrors,
  getAdminBookings,
  deleteBooking,
} from '../../redux/actions/bookingAction';
import { MDBDataTable } from 'mdbreact';
import easyinvoice from 'easyinvoice';

import { DELETE_BOOKING_RESET } from '../../redux/constants/bookingConstants';

const AllBookings = ({ bookings, error, loading, isDeleted, deleteError }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAdminBookings());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push('/admin/bookings');
      dispatch({
        type: DELETE_BOOKING_RESET,
      });
    }
  }, [dispatch, deleteError, isDeleted]);

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

              <button
                className='btn btn-success mx-2'
                onClick={() => downloadInvoice(booking)}
              >
                <i className='fa fa-download'></i>
              </button>

              <button
                className='btn btn-danger mx-2'
                onClick={() => deleteBookingHandler(booking._id)}
              >
                <i className='fa fa-trash'></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  const deleteBookingHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  const downloadInvoice = async (booking) => {
    const data = {
      documentTitle: 'Booking INVOICE', //Defaults to INVOICE
      //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
      currency: 'USD', //See documentation 'Locales and Currency' for more info
      taxNotation: 'vat', //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: 'https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png',
      background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg', //or base64 //img or pdf
      sender: {
        company: 'Book IT',
        address: '13th Street. 47 w 13th St',
        zip: '10001',
        city: 'Gaza',
        country: 'Palestine',
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: '4567 CD',
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          'en-US'
        )}`,
        country: `Check Out: ${new Date(booking.checkOutDate).toLocaleString(
          'en-US'
        )}`,
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString('en-US')}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 6,
          price: booking.room.pricePerNight,
        },
      ],
      bottomNotice:
        'This is auto generated Invoice of your booking on Book IT.',
    };

    const result = await easyinvoice.createInvoice(data);

    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };

  return (
    <div className='container container-fluid'>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className='my-5'>{`${bookings && bookings.length} Bookings`}</h1>

          <MDBDataTable
            data={setBookings()}
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
  bookings: state.bookings.bookings,
  error: state.bookings.error,
  loading: state.bookings.loading,
  isDeleted: state.booking.isDeleted,
  deleteError: state.booking.error,
});

export default connect(mapStateToProps)(AllBookings);
