const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const childProcess = require('child_process');
const ffmpegPath = require('ffmpeg-static');

app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('avatar');

app.post('/video', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).send('Upload failed');
        }

        const inputFile = `${process.cwd()}/../../public/assets/${req.file.filename}`;
        const fileName = req.file.filename.replace(/\.[^/.]+$/, ''); // Removes the file extension
        const outputFile = `${process.cwd()}/uploads/${fileName}.png`;

        console.log('Input file:', inputFile);
        console.log('Output file:', outputFile);

        const child = childProcess.spawn(
            ffmpegPath,
            [
                '-i',
                inputFile,
                '-ss',
                '00:00:14.435',
                '-vframes',
                '1', // Specify number of frames to output
                outputFile,
            ],
        );

        child.on('error', (err) => {
            console.error('Error executing FFmpeg:', err);
            res.status(500).send('FFmpeg execution failed');
        });

        child.on('close', (code) => {
            if (code === 0) {
                console.log('FFmpeg finished successfully');
                res.status(200).send('Thumbnail generated successfully.');
            } else {
                console.error('FFmpeg process exited with code:', code);
                res.status(500).send('Thumbnail generation failed');
            }
        });

    });
});

app.post('/json', (req,res) => {
    const jsonData = req.body;
    res.status(200).json ({message: 'ok'});
    console.log(jsonData)

    var obj = JSON.parse(fs.readFileSync('filedata.json', 'utf-8'))

    obj.push(jsonData)

    var newobj = JSON.stringify(obj)

    fs.writeFileSync('filedata.json', newobj)

    console.log(newobj)
})

const port = +process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`Server running at ${port}`);
});