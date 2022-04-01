
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	userName:{
		type: String,
		required: [true, "Username is required"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	isActive: {
		type: Boolean,
		default: true
	}

}, {timestamps: true})

module.exports = mongoose.model(`User`, userSchema);