var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
var bcrypt = require('bcryptjs');
const session = require('express-session');

fetch.Promise = Bluebird;





const RedirectLogin = (req, res , next)=>

{
if ( ! req.session.user)
{
  res.redirect('login/auth');
}
else next();

}

const RedirectHome= (req, res , next)=>

{
if ( req.session.user)
{
  res.redirect('index', {title:"welcome"});
}
else next();

}

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
  const body = req.body;
  console.log(body);
  let emp = await getEmp(body.cin)
  
console.log(emp);
  if (emp) {
    const validPassword = await bcrypt.compare(body.password, emp.password);
    if (validPassword ) {
      req.session.user= emp;
      if (emp.id_role==2)
      {
        console.log(req.session.userId)
        res.render('admin/dashboard');
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

router.get('/logout', RedirectLogin,function(req, res, next) {
console.log(req.session.user);
req.session.destroy();
console.log(req.session.user);
RedirectLogin

})

module.exports = router;
