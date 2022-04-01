
const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "Username is required"],
		unique: true
	},
	HP: {
		type: Number,
		required: [true, "Password is required"]
	},
	basicAttackDamage: {
		type: Number,
		required: [true, "Basic Attack Damage is required"]
	},
	skillDamage: {
		type: Number,
		required: [true, "Skill Attack Damage is required"]
	},
	category: {
        type: Array,
        required: [true, `Category is required.`]
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, {timestamps: true})

module.exports = mongoose.model(`Hero`, heroSchema);