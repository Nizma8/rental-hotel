const mangoose = require("mongoose");
const validator = require("validator");
const userSchema = new mangoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "Email-id is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    validate: {
      validator: function (value) {
        return validator.isLength(value, {
          min: 6,
        });
      },
      message: "Password must contain a minimum of 6 characters",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
role:  {type: String, // Array of roles
    enum: ["admin", "user", "host"],
    default: "user",
  },
  Adress: {
    type: String,
  },
  image: {
    type: String,
  },
});

const users = new mangoose.model("users", userSchema);
module.exports = users;
