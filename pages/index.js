// Component
import HomeIndex from '../components/Home';
import Layout from '../components/layout/Layout';

// Redux
import { getRooms } from '../redux/actions/roomActions';
import { wrapper } from '../redux/store';

const Home = () => {
  return (
    <Layout>
      <HomeIndex />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(
        getRooms(req, query.page, query.location, query.guests, query.category)
      );
    }
);

export default Home;
