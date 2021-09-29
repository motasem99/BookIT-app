module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',

    STRIPE_API_KEY:
      'pk_test_51Jf0YsIZdnwzeUymHZyhBuSkmhuAiTpp9f8wryGoDbqULC7yBjEoj7uOZOdbcZo9oy6pE2VwxVnbePDXUJaXDoYV00DNMQTf4k',
    STRIPE_SECRET_KEY:
      'sk_test_51Jf0YsIZdnwzeUymlpVKBemaAq3x5UZ5fSM4k2pUbi3izp8hqKoBuI0xMii5nzkfIqzFb93793YZUEmYxe4PIHLP00U08fuai4',

    CLOUDINARY_CLOUD_NAME: 'bookit-app-mutasem',
    CLOUDINARY_API_KEY: '177456338558743',
    CLOUDINARY_API_SECRET: 'kQ9Ny3_7F2y-pjfHfDQOXQ5KYcI',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '0bba95d5efb89c',
    SMTP_PASSWORD: 'cc9d2d0bf3373b',
    SMTP_FROM_NAME: 'BookIT',
    SMTP_FROM_EMAIL: 'noreply@bookit.com',
  },
  images: {
    domains: ['res.cloudinary.com', 'a0.muscache.com'],
  },
};
