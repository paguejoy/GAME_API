const jwt = require('jsonwebtoken');


module.exports.createToken = (data) => {
	let userData = {
		id: data._id,
		isAdmin: data.isAdmin
	}

	return jwt.sign(userData, process.env.SECRET_PASS );
}



module.exports.verify = (req, res, next) => {
	const requestToken = req.headers.authorization

	if(typeof requestToken == "undefined"){
		res.status(401).send(`Token missing`)

	}else{
		const token = requestToken.slice(7, requestToken.length);

		if(typeof token !== "undefined"){

			return jwt.verify(token, process.env.SECRET_PASS, (err, data) => {
				if(err){
					return res.send({auth: `auth failed!`})

				} else{
					next()
				}
			})
		}
	}
}



//ADMIN TOKEN
module.exports.verifyAdmin = (req, res, next) => {
	const requestToken = req.headers.authorization
	
	if(typeof requestToken == "undefined"){
		res.status(401).send(`Token missing`)

	}else{
		const token = requestToken.slice(7, requestToken.length);

		if(typeof token !== "undefined"){
			const admin = jwt.decode(token).isAdmin

			if(admin){
				return jwt.verify(token, process.env.SECRET_PASS, (err, data) => {
					if(err){
						return res.send({auth: `auth failed!`})

					} else{
						next()
					}
				})
			} else {
				res.status(403).send(`You are not authorized.`)
			}
			
		}
	}
}


//USER TOKEN
module.exports.verifyUser = (req, res, next) => {
	const requestToken = req.headers.authorization
	
	if(typeof requestToken == "undefined"){
		res.status(401).send(`Token missing`)

	}else{
		const token = requestToken.slice(7, requestToken.length);

		if(typeof token !== "undefined"){
			const admin = jwt.decode(token).isAdmin

			if(!admin){
				return jwt.verify(token, process.env.SECRET_PASS, (err, data) => {
					if(err){
						return res.send({auth: `auth failed!`})

					} else{
						next()
					}
				})
			} else {
				res.status(403).send(`You are not authorized.`)
			}
			
		}
	}
}




// DECODE TOKEN
module.exports.decode = (bearerToken) => {

	const token = bearerToken.slice(7, bearerToken.length)
	
	return jwt.decode(token)
}
