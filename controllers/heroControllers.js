
const Hero = require('./../models/Hero')


module.exports.create = async (params) => {
	const {name, HP, basicAttackDamage, skillDamage, category } = params

	return await Hero.findOne({name: name}).then(hero => {
		if(hero !== null){
			return {response: `Hero already exists`}
		} else {
			let newHero = new Hero({
				name: name,
				HP: HP,
				basicAttackDamage: basicAttackDamage,
				skillDamage: skillDamage,
				category: category
			})

			return newHero.save().then(hero => hero ? true : false)
		}
	})

}

module.exports.AllHeroes = async (data) => {
	const { category, heroName } = data

	if(category){
		let queryCategory = category.toLowerCase()

		return await Hero.find(
			{
                category: {
                    $in: [queryCategory]
               	}
            }).sort({createdAt: -1}).then(heroes => heroes)

	} else if(heroName){
		let capletter = heroName.slice(0,1).toUpperCase()
		let lowLetter = heroName.slice(1, heroName.length).toLowerCase()
		let name = capletter + lowLetter

		return await Hero.find({name: name}).sort({createdAt: -1}).then(heroes => heroes)

	} else if(category && heroName){
		let queryCategory = category.toLowerCase()

		let capletter = heroName.slice(0,1).toUpperCase()
		let lowLetter = heroName.slice(1, heroName.length).toLowerCase()
		let name = capletter + lowLetter

		return await Hero.find(
			{
				name: name,
                category: {
                    $in: [queryCategory]
               	}
            }).sort({createdAt: -1}).then(heroes => heroes) 

	} else {
		return await Hero.find().sort({createdAt: -1}).then(heroes => heroes) 
	}
}

module.exports.activeHeroes = async () => {
	return await Hero.find({isActive: true}).sort({createdAt: -1}).then(heroes => heroes ? heroes : false)
}


module.exports.getAHero = async (heroId) => {
	return await Hero.findById(heroId).then(hero => hero ? hero : false)
}


module.exports.updateHero = async (heroId, update) => {
	return await Hero.findByIdAndUpdate(heroId, {$set: update}, {new:true}).then(hero => hero ? hero : false)
}


module.exports.archive = async (heroId) => {
	return await Hero.findByIdAndUpdate(heroId, {$set: {isActive: false}}, {new:true}).then(hero => hero ? hero : false)
}


module.exports.unArchive = async (heroId) => {
	return await Hero.findByIdAndUpdate(heroId, {$set: {isActive: true}}, {new:true}).then(hero => hero ? hero : false)
}

module.exports.deleteHero = async (heroId) => {
	return await Hero.findByIdAndDelete(heroId).then(hero => hero ? true : false)
}


