import React from 'react';
import { getSession } from 'next-auth/client';

import MyBookings from '../../components/booking/MyBookings';
import Layout from '../../components/layout/Layout';
import { myBookings } from '../../redux/actions/bookingAction';

import { wrapper } from '../../redux/store';

const MyBookingsPage = () => {
  return (
    <Layout title='My Bookings'>
      <MyBookings />
    </Layout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//       async ({ req, query }) => {
//         await store.dispatch(
//           getRooms(req, query.page, query.location, query.guests, query.category)
//         );
//       }
//   );

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
      await store.dispatch(myBookings(req.headers.cookie, req));
    }
);

//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: session,
//   };
// }
export default MyBookingsPage;
