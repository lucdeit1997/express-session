var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
 
var app = express()
 
app.use(session({
  secret: 'dhadadafhhsfbhbshh',
  resave: false,
  saveUninitialized: true
}))

app.use(function(req, res, next){

  if(!req.session.views)
  {
    req.session.views = {};
  }
  const pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0 ) + 1;
  next();
})

app.get('/demo',(req, res) =>{
  res.send('you viewed this page ' + req.session.views['/demo'] + ' times')
})

app.get('/demo1', (req, res) =>{
  res.send('you viewed this page ' + req.session.views['/demo1'] + ' times')
})

app.get('/xoa-session', (req, res) =>{
  req.session.destroy(function(err) {
      if(err)
        return res.json({
          err
        })
        res.json({
          message : 'xoa session thanh cong'
        })
  })
})

app.listen(3000, () =>{
  console.log('3000');
})
