import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    role: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index the email field for quicker searches
userSchema.index({ email: 1 });

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to activate a user account
userSchema.methods.activateAccount = function () {
  this.isActive = true;
  this.deactivatedAt = null;
  return this.save();
};

// Method to deactivate a user account
userSchema.methods.deactivateAccount = function () {
  this.isActive = false;
  this.deactivatedAt = new Date();
  return this.save();
};

// Method to check if the user is an admin
userSchema.methods.isAdminUser = function () {
  return this.isAdmin;
};

const User = mongoose.model("User", userSchema);

export default User;
