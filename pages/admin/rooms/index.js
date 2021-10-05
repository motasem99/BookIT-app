// Next
import { getSession } from 'next-auth/client';

// Component
import AllRooms from '../../../components/admin/AllRooms';
import Layout from '../../../components/layout/Layout';

const AllRoomsPage = () => {
  return (
    <Layout title='All Rooms'>
      <AllRooms />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default AllRoomsPage;
