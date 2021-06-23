// server.js

//declaring function
function zeroPrefix(value,condition){
  str = value.toString()
  if (str.length < condition){
    return "0"+str;
  }
  else{
    return str;
  }
};

function checkDate(date){
  if (date == undefined){
    return undefined;
  }
  else if (new Date(date) != "Invalid Date" ){
    return new Date(date);
  }
  else if (/^((\s+)?\d+(\s+)?,(\s+)?)+\d+$/.test(date) == true){
    var re = /\d+/g;
    var dt = [];
    regex = date.match(re);
    
    for (x =0;x<7;x++){
        if (regex[x] !== undefined){
          dt.push(parseInt(regex[x]))
        }
        else{
          dt.push(0)
        }
    }
    console.log(dt)
    
    if (new Date(dt[0],dt[1],dt[2],dt[3],dt[4],dt[5],dt[6]) != "Invalid Date"){
      return new Date(dt[0],dt[1],dt[2],dt[3],dt[4],dt[5],dt[6]);
    }
    else {
      return "Invalid Date";
    }    
  }
  else if (/^\d+$/.test(date) == true &&  new Date(parseInt(date)) != "Invalid Date"){
    console.log("PARSED"+parseInt(date))
    return new Date(parseInt(date));
  }
  else{
    return "Invalid Date"
  }
};
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req,res){
  
  var days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  var date = checkDate(req.params.date) 
  console.log(date)
  console.log("#######"+req.params.date+"######")
  if (date === undefined){
    dateNow = new Date(Date.now()) 
    res.send(res.send({ unix: Date.parse(dateNow), utc:days[dateNow.getDay()]+", "+zeroPrefix(dateNow.getDate(),2)+" "+months[dateNow.getMonth()]+" "+dateNow.getFullYear()+" "+zeroPrefix(dateNow.getHours(),2)+":"+zeroPrefix(dateNow.getMinutes(),2)+":"+zeroPrefix(dateNow.getSeconds(),2)+" GMT" }))
  }
  else if (date != "Invalid Date"){
    res.send({ unix: Date.parse(date), utc:days[date.getDay()]+", "+zeroPrefix(date.getDate(),2)+" "+months[date.getMonth()]+" "+date.getFullYear()+" "+zeroPrefix(date.getHours(),2)+":"+zeroPrefix(date.getMinutes(),2)+":"+zeroPrefix(date.getSeconds(),2)+" GMT" })
  }
  else{
      res.send({ error : "Invalid Date" });
  }
  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
