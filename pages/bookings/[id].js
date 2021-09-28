import React from 'react';
import { getSession } from 'next-auth/client';

import BookingDetails from '../../components/booking/BookingDetails';
import Layout from '../../components/layout/Layout';
import { getBookingDetails } from '../../redux/actions/bookingAction';

import { wrapper } from '../../redux/store';

const BookingDetailsPage = () => {
  return (
    <Layout title='My Bookings'>
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getBookingDetails(req.headers.cookie, req, params.id)
      );
    }
);

export default BookingDetailsPage;
