var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config()
var formidable = require('formidable');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', async (req,res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.dir(files.upfile[0].mimetype);
    let obj = {};
    obj.name = files.upfile[0].originalFilename;
    obj.type = files.upfile[0].mimetype;
    obj.size = files.upfile[0].size;
    res.json(obj);
  });
  
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
