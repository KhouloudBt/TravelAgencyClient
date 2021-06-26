var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
router.use( express.static( "public" ) );
    multer  = require( 'multer' );
/*const upload = multer({dest: 'public/img/'});

var storage = multer.diskStorage(
	{dest: 'public/img/', 
            filename: function ( req, file, cb ) {
           cb( null, file.originalname+ '-' + Date.now()+".jpg");
        }});
var upload = multer( { storage: storage } );
*/
var storage = multer.diskStorage(
    {
        destination: './public/img/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname+ '-' + Date.now()+".jpg");
        }
    }
);

var upload = multer( { storage: storage } );

var hotel ={ name:"",phone:'0',stars:0, webSite:"", country: "",city: "",roomCouple:0,roomSingle:0,allInclusive:0,photo: ""};

router.get('/', function(req, res, next) {
  res.render('Hotels/addHotel', { message: '',classAlert:'',file:'' });
 //     this.photo=this.file;	
});

router.post('/', function(req, res, next) {
//hotel=body
console.log( req.body)
fetch("http://localhost:3002/hotels/", {
        method: 'post',
        body:  JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
     .then(res.render('Hotels/addHotel',{
      message:"Hotel added successfuly",
     classAlert:"alert alert-success"}));
});

router.post('/upload',upload.single('file'), (req, res) => {	
	console.log(req.file)
  if (!req.file) {
    console.log("No file received");
    return res.redirect ('/hotels/add');

  } else {
    console.log('file received');
 //   this.photo=this.file;
    return   res.render('Hotels/addHotel', { message: 'photo is uploaded',classAlert:'alert alert-success' ,file: req.file.filename});
  }
});

module.exports = router;

