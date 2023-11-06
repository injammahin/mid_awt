// ormconfig.js

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '2023',
  database: 'userBD',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // For development only; set to false in production
};
