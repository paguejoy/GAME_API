const express = require('express')
const router = express.Router()

const {
	create,
	AllHeroes,
	activeHeroes,
	getAHero,
	updateHero,
	archive,
	unArchive,
	deleteHero

} = require('./../controllers/heroControllers')

const {verifyAdmin, verify} = require('./../auth')


// CREATE A HERO
router.post('/create', verifyAdmin, async (req, res) => {
	try{
		create(req.body).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})


// GET ALL HEROES
router.get('/', async (req, res) => {
	
	let data = {
		 category: req.query.category,
		 heroName: req.query.name
	}

	try{
		await AllHeroes(data).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}

})



// GET ALL ACTIVE HEROES
router.get('/isActive', verify, async (req, res) => {
	try{
		await activeHeroes().then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})



// GET SPECIFIC HERO
router.get('/:heroId', verify, async (req, res) => {
	try{
		await getAHero(req.params.heroId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})



// UPDATE HERO INFO
router.put('/:heroId/update', verifyAdmin, async (req, res) => {
	try{
		await updateHero(req.params.heroId, req.body).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})




// ARCHIVE HERO
router.patch('/:heroId/archive', verifyAdmin, async (req, res) => {
	try{
		await archive(req.params.heroId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})


// UNARCHIVE HERO
router.patch('/:heroId/unarchive', verifyAdmin, async (req, res) => {
	try{
		await unArchive(req.params.heroId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})




// DELETE A HERO
router.delete('/:heroId/delete', verifyAdmin, async (req, res) => {
	try{
		await deleteHero(req.params.heroId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})




module.exports = router