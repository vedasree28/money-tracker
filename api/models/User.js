const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// ✅ Pre-save hook to hash password
// Note: async functions automatically return a promise, no next() needed
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // only hash if password changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export the model
module.exports = mongoose.model("User", UserSchema);