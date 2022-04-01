const CryptoJS = require("crypto-js");

const User = require('./../models/User')
const { createToken } = require('./../auth')

 
module.exports.allUsers = () => {
	return User.find().then(users => users)
}

module.exports.register = (params) => {
	const {userName, password} = params

	return User.findOne({userName: userName}).then(user => {
		if(user !== null){
			
			return {response: `user exists`}
		} else {
			let newUser = User({
					userName: userName,
					password: CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString()
			})

			return newUser.save().then(user => user ? true : false)
		}
	})
}

module.exports.login = (params) => {
	const {userName, password} = params

	return User.findOne({userName: userName}).then(user => {
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

module.exports.profile = (userId) => {
	return User.findById(userId).then(user => user ? user : false)
}

module.exports.update = (userId, params) => {
	const {userName, password} = params

	return User.findByIdAndUpdate(userId, {$set: params}, {new:true}).then(user => user ? user : false)
}


module.exports.adminStatus = (params) => {
	const { userId } = params

	return User.findByIdAndUpdate(userId, {$set: {isAdmin: true}}, {new:true}).then(user => user ? user : false)
}

module.exports.userStatus = (params) => {
	const { userId } = params

	return User.findByIdAndUpdate(userId, {$set: {isAdmin: false}}, {new:true}).then(user => user ? user : false)
}

module.exports.deactivateUser = (userId) => {
	return User.findByIdAndUpdate(userId, {$set: {isActive: false}}, {new:true}).then(user => user ? user : false)

}

module.exports.reactivateUser = (userId) => {

	return User.findByIdAndUpdate(userId, {$set: {isActive: true}}, {new:true}).then(user => user ? user : false)

}

module.exports.deleteUser = (userId) => {

	return User.findByIdAndDelete(userId).then(user => user ? true : false)

}