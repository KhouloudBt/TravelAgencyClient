var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var sess= require("../app");
var cookieParser = require('cookie-parser');
const Bluebird = require('bluebird');
/*var app=express();
var session =session({
  /* genid: function(req) {
     return genuuid() 
   },
   secret: 'secret',
   resave: false,
   
   saveUninitialized: true
 })
app.use(session);*/

fetch.Promise = Bluebird;



//app.use(cookieParser('session'));


function getEmp(cin)
{
  return (fetch("http://localhost:3002/personnel/getbyCin/"+ cin)
  .then(res=> res.json()))
}
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login/auth');
});

router.post("/", async (req, res, next) => {
  console.log(req.session);
  const body = req.body;
   let emp = await getEmp(body.cin)
  
  console.log(emp);
  if (emp) {
    const validPassword = await bcrypt.compare(body.password, emp.password);
    if (validPassword ) {
            req.session.user = emp;
            req.session.save();
            console.log(req.session);               

      if (emp.id_role==2)
      {
        res.render('admin/home', { title: 'Admin' });
      }
      else
      res.render('index', {title:emp.nom})
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});
router.get('/user', function(req, res, next) {
  return res.send(req.session.user);
});

var getCurrentUSer= ((req, res)=>{

  return req.session.user;
})


router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('login/auth');
});

module.exports = router;
