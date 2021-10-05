// Next
import { getSession } from 'next-auth/client';

// Component
import BookingDetails from '../../components/booking/BookingDetails';
import Layout from '../../components/layout/Layout';

// Redux
import { getBookingDetails } from '../../redux/actions/bookingAction';
import { wrapper } from '../../redux/store';

const BookingDetailsPage = () => {
  return (
    <Layout title='Booking Details'>
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
