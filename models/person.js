const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
const uri = process.env.MONGODB_URI;

console.log("connecting to", uri);

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}/.test(v) && v.replace(/-/g, "").length >= 9;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required."],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
