import mongoose from 'mongoose';

// An interface that describes the properties
// required to create a new user
interface UserAttrs {
  email: String;
  password: String; 
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User , buildUser };