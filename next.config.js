module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
    DB_URI:
      'mongodb+srv://mutasem:mutasem274@cluster0.ssqnm.mongodb.net/bookit?retryWrites=true&w=majority',

    STRIPE_API_KEY:
      'pk_test_51Jf1dTIA2mdD6zymhaM1DyTg6JhBNr7vTcVSHNNy199Ov3qYl1lSrxKoOHP3739bkFUceCSZWCbGwHWr4SDpuACC00XMB6KSWm',
    STRIPE_SECRET_KEY:
      'sk_test_51Jf1dTIA2mdD6zym0Y15LnmCHTuqBkLd4MxYBDu9cE9E89bI0wQdVQ74ujQS7Q7pwh195PlcVwTKzTYMCbsf5pUv007ycjMI0c',
    STRIPE_WEBHOOK_SECRET: 'whsec_WrefoI0z1x0RWYDD25HSuIn2mK7C3DoC',

    CLOUDINARY_CLOUD_NAME: 'bookit-app-mutasem',
    CLOUDINARY_API_KEY: '177456338558743',
    CLOUDINARY_API_SECRET: 'kQ9Ny3_7F2y-pjfHfDQOXQ5KYcI',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '0bba95d5efb89c',
    SMTP_PASSWORD: 'cc9d2d0bf3373b',
    SMTP_FROM_NAME: 'BookIT',
    SMTP_FROM_EMAIL: 'noreply@bookit.com',

    NEXTAUTH_URL: 'https://bookit.vercel.app',
  },
  images: {
    domains: ['res.cloudinary.com', 'a0.muscache.com'],
  },
};
