import Sequelize from 'sequelize';
import { db, connectDB, sequelize } from './dbConfig.js'; 
import dotenv from 'dotenv';

dotenv.config();

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  googleId: { // Assuming you want to store Google ID
    type: Sequelize.STRING,
    unique: true,
    allowNull: true // Since not all users will have a Google ID
  }
  // Include any other fields that you may need
});

// You can add class or instance level methods here
User.findOrCreateByGoogleId = async function(googleId, additionalInfo) {
  return User.findOrCreate({
    where: { googleId },
    defaults: additionalInfo
  });
};

export default User;
