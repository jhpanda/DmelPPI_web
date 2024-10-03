const express = require('express');
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 6060;

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

let results = [];

//fs.createReadStream('data/pae_dcut6_pcut15.csv')
fs.createReadStream('data/pae_summary.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));
//app.use(express.static('public'));

app.get('/data', (req, res) => {
    const id = req.query.id;
    if (id) {
        const item = results.find(entry => entry.id === id);
        res.json(item);
    } else {
        res.json(results);
    }
});

//app.listen(port, () => {
//    console.log(`Server running on http://localhost:${port}`);
//});
//
const HOST = "129.85.18.119"

app.listen(port, HOST,() => {
    console.log(`Server running on http://${HOST}:${port}`);
});

