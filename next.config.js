module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',

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
