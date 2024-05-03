const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      // required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (this.$isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
