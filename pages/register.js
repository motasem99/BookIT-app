// Component
import Register from '../components/auth/Register';
import Layout from '../components/layout/Layout';

// Next
import { getSession } from 'next-auth/client';

const RegisterPage = () => {
  return (
    <Layout title='Register'>
      <Register />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default RegisterPage;
