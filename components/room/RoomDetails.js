import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// React Bootstrap
import { Carousel } from 'react-bootstrap';

// Next
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Redux
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../../redux/actions/roomActions';
import {
  checkBooking,
  getBookedDates,
} from '../../redux/actions/bookingAction';
import { CHECK_BOOKING_RESET } from '../../redux/constants/bookingConstants';

// Component
import NewReview from '../review/NewReview';
import RoomFeatures from './RoomFeatures';
import ListReviews from '../review/ListReviews';

// axios
import axios from 'axios';

// Stripe
import getStripe from '../../utils/getStripe';

const RoomDetails = ({
  room,
  error,
  available,
  user,
  bookingLoading,
  dates,
}) => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const excludedDates = [];
  dates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  const onChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // Calculate days of stay
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );
      setDaysOfStay(days);

      dispatch(
        checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString())
      );
    }
  };

  const { id } = router.query;

  const newBookingHandler = async () => {
    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: 'STRIPE_PAYMENT_ID',
        status: 'STRIPE_PAYMENT_STATUS',
      },
    };
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/bookings', bookingData, config);
    } catch (error) {
      console.log(error.response);
    }
  };

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);

    const amount = pricePerNight * daysOfStay;

    try {
      const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;

      const { data } = await axios.get(link, { params: { amount } });

      const stripe = await getStripe();

      // Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.id });

      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(getBookedDates(id));

    toast.error(error);
    dispatch(clearErrors());

    return () => {
      dispatch({
        type: CHECK_BOOKING_RESET,
      });
    };
  }, [dispatch, id]);

  return (
    <Fragment>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>
      <div className='container container-fluid'>
        <h2 className='mt-5'>{room.name}</h2>
        <p>{room.address}</p>

        <div className='ratings mt-auto mb-3'>
          <div className='rating-outer'>
            <div
              className='rating-inner'
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id='no_of_reviews'>({room.numOfReviews} Reviews)</span>
        </div>

        <Carousel hover='pause'>
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: '100%', height: '440px' }}>
                  <Image
                    className='d-block m-aotu'
                    src={image.url}
                    alt={room.name}
                    layout='fill'
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className='row my-5'>
          <div className='col-12 col-md-6 col-lg-8'>
            <h3>Description</h3>
            <p>{room.description}</p>

            <RoomFeatures room={room} />
          </div>

          <div className='col-12 col-md-6 col-lg-4'>
            <div className='booking-card shadow-lg p-4'>
              <p className='price-per-night'>
                <b>${room.pricePerNight}</b> / night
              </p>

              <hr />

              <p className='mt-5 mb*3'>Pick Check In & Check Out Date</p>

              <DatePicker
                className='w-100'
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              {available === true && (
                <div className='alert alert-success my-3 font-weight-bold'>
                  Room is available. Book now.
                </div>
              )}

              {available === false && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Room is not available. Try different dates.
                </div>
              )}

              {available && !user && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Login to book room.
                </div>
              )}

              {available && user && (
                <button
                  className='btn btn-block py-3 booking-btn'
                  onClick={() => bookRoom(room._id, room.pricePerNight)}
                  disabled={bookingLoading || paymentLoading ? true : false}
                >
                  Pay - ${daysOfStay * room.pricePerNight}
                </button>
              )}
            </div>
          </div>
        </div>

        <NewReview />
        {room.reviews && room.reviews.length > 0 ? (
          <ListReviews reviews={room.reviews} />
        ) : (
          <p>No Reviews on this room</p>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    room: state.roomDetails.room,
    error: state.roomDetails.error,
    available: state.checkBooking.available,
    bookingLoading: state.checkBooking.loading,
    user: state.loadedUser.user,
    dates: state.bookedDates.dates,
  };
};

export default connect(mapStateToProps)(RoomDetails);
