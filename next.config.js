module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',

    CLOUDINARY_CLOUD_NAME: 'bookit-app-mutasem',
    CLOUDINARY_API_KEY: '177456338558743',
    CLOUDINARY_API_SECRET: 'kQ9Ny3_7F2y-pjfHfDQOXQ5KYcI',
  },
  images: {
    domains: ['res.cloudinary.com', 'a0.muscache.com'],
  },
};
