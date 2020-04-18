const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const { uri } = require('./config.json');

const port = process.env.PORT || 5000;

const client = new MongoClient(uri);
app.use(cors());
app.listen(port, function () {
	console.log(`server running on ${port}`);
});

app.get('/', function (req, res) {
	async function main() {
		try {
			await client.connect();
			await findCollections(client);
		} catch (e) {
			console.log(e);
		} finally {
			res.send(docs);
			// await client.close();
		}
	}

	var docs = [];

	main().catch(console.error);

	async function findCollections() {
		try {
			result = await client
				.db('liveTest')
				.collection('funEbooks')
				.find()
				.forEach((doc) => docs.push(doc));
		} catch (e) {
			console.log('error: ' + e);
		}
	}
});
