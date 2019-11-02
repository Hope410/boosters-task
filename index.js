const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const spawnMetric = require('./spawnMetric');

const app = express();

app.use(fileUpload({
	useTempFiles : true,
	tempFileDir : 'uploaded/'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendFile(path.resolve('views/index.html'));
});

app.post('/metrics', async (req, res) => {
	try {
		const { csv_file } = req.files;

		const mae = await spawnMetric('mae', csv_file.tempFilePath);
		const mape = await spawnMetric('mape', csv_file.tempFilePath);

		res.json({ mae, mape });
	} catch(e) {
		console.error(e.toString());
		res.status(500).send('Не удалось загрузить файлы.');
	}
});

app.listen(3000, (e) => e
	? console.error(e)
	: console.log('serv is listening on 3000'))