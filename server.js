const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res) {
  res.json({ greetings: 'Hello, API' });
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const { originalname, mimetype, size } = req.file;

  const metadata = {
    name: originalname,
    type: mimetype,
    size: size
  };

  res.json(metadata);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Node.js listening ...');
});
