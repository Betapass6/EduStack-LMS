export const environment = {
  production: false,
  apiUrl: (typeof process !== 'undefined' && process.env && process.env['API_URL']) ? process.env['API_URL'] : 'http://localhost:8000/api'
};
// Untuk build custom env: gunakan package seperti ngx-env, dotenv-webpack, atau definePlugin di angular.json/webpack.config.js
// Contoh: API_URL di .env, lalu expose ke build dengan tools tsconfig/webpack 