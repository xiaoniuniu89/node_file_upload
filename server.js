const express = require('express');
const path = require('path');
const multer  = require('multer')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: 'uploads/', storage: storage })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send('File uploaded!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
