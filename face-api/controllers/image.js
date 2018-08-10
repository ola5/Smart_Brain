const Clarifai = require('clarifai'); 

// Adding API key for Clarifai
const app = new Clarifai.App({
  apiKey: '3b581cc9d77f4b6dbd0ce30b9f770b79'
});

const handleApiCall = (req, res) => {
	app.models
   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data => {
   	 res.json(data);
   })
     .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}