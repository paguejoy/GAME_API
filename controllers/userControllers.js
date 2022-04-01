const CryptoJS = require("crypto-js");

const User = require('./../models/User')
const { createToken } = require('./../auth')

 
module.exports.allUsers = async () => {
	return await User.find().then(users => users)
}

module.exports.register = async (params) => {
	const {userName, password} = params

	return await User.findOne({userName: userName}).then(user => {
		if(user !== null){
			
			return {response: `user exists`}
		} else {
			let newUser = User({
					userName: userName,
					password: CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString()
			})

			return await newUser.save().then(user => user ? true : false)
		}
	})
}

module.exports.login = async (params) => {
	const {userName, password} = params

	return await User.findOne({userName: userName}).then(user => {
		if(user == null){
			return {response: `Username not found`}
		} else {
			const decryptPw = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8)

			if(password == decryptPw){
				return { token: createToken(user) }
			} else {
				return {auth: `Auth Failed!`}
			}

		}
	})
}

module.exports.profile = async (userId) => {
	return await User.findById(userId).then(user => user ? user : false)
}

module.exports.update = async (userId, params) => {
	const {userName, password} = params

	return await User.findByIdAndUpdate(userId, {$set: params}, {new:true}).then(user => user ? user : false)
}


module.exports.adminStatus = async (params) => {
	const { userId } = params

	return await User.findByIdAndUpdate(userId, {$set: {isAdmin: true}}, {new:true}).then(user => user ? user : false)
}

module.exports.userStatus = async (params) => {
	const { userId } = params

	return await User.findByIdAndUpdate(userId, {$set: {isAdmin: false}}, {new:true}).then(user => user ? user : false)
}

module.exports.deactivateUser = async (userId) => {
	return await User.findByIdAndUpdate(userId, {$set: {isActive: false}}, {new:true}).then(user => user ? user : false)

}

module.exports.reactivateUser = async (userId) => {

	return await User.findByIdAndUpdate(userId, {$set: {isActive: true}}, {new:true}).then(user => user ? user : false)

}

module.exports.deleteUser = async (userId) => {

	return await User.findByIdAndDelete(userId).then(user => user ? true : false)

}