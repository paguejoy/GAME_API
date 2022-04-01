const express = require('express');
const router = express.Router();

// Import units of functions from userController module
const {
	allUsers,
	register,
	login,
	profile,
	update,
	adminStatus,
	userStatus,
	deactivateUser,
	reactivateUser,
	deleteUser 

} = require('./../controllers/userControllers');

const {verify, decode, verifyAdmin, verifyUser} = require('./../auth');



//GET ALL USERS
router.get('/', async (req, res) => {

	try{
		await allUsers().then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})


//REGISTER A USER 
router.post('/register', async (req, res) => {
	try{
		await register(req.body).then(result => res.send(result))

	} catch(err){
		res.status(500).json(err)
	}
})


//LOGIN THE USER
router.post('/login', async (req, res) => {
	try{ 
		await login(req.body).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})


//RETRIEVE USER INFORMATION
router.get('/profile', verifyUser, async (req, res) => {
	const userId = decode(req.headers.authorization).id
	try{
		await profile(userId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})

// UPDATE USER INFO
router.put('/update', verifyUser, async (req, res) => {
	const userId = decode(req.headers.authorization).id
	try{
		await update(userId, req.body).then(result => res.send(result))
	}catch(err){
		res.status(500).json(err)
	}
})



// UPDATE TO GET ADMIN ACCESS
router.patch('/isAdmin', verifyAdmin, async (req, res) => {
	try{
		await adminStatus(req.body).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}

})



// UPDATE BACK TO USER ACCESS
router.patch('/isUser', verifyAdmin, async (req, res) => {
	try{
		await userStatus(req.body).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})


// REACTIVATE USER ACCOUNT
router.patch('/:userId/deactivate', verifyUser, async (req, res) => {
	try{
		await deactivateUser(req.params.userId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})

// REACTIVATE USER ACCOUNT
router.patch('/:userId/reactivate', verifyUser, async (req, res) => {
	try{
		await reactivateUser(req.params.userId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})


// DELETE USER ACCOUNT
router.delete('/:userId/delete', verify, async (req, res) => {
	try{
		await deleteUser(req.params.userId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})




module.exports = router;