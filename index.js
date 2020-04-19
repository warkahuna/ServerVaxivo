const express = require ('express');
const PatientFrom = require('./Models/PatientForm')
const mongoose = require('mongoose')

const app = express();
const httpPort=3000;
const tf = require ('@tensorflow/tfjs');
const fetch = require("node-fetch");
const fs = require('fs');
const { Image, createCanvas,canvas } = require('canvas');

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//DB Config
const db = require('./config/Keys').MongoURI

//Connect to Mongo
mongoose.connect(db,{useUnifiedTopology: true,useNewUrlParser: true})
.then(()=> console.log('MongoDB Connected ...'))
.catch(err=>console.log(err))

app.use(function(req,res,next){
	
	res.header ("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X Requested-with, Content-Type,Accept");
	next();
})

app.get('/getModel',function(req,res) {
	let rawdata = fs.readFileSync('Model/model.json');
	let modelJson = JSON.parse(rawdata);
	res.send(modelJson);
})

app.get('/getgouvernerat',function(req,res) {
	let rawdata = fs.readFileSync('Model/tn.json');
	let modelJson = JSON.parse(rawdata);
	res.send(modelJson);
})
app.get('/getdelegation',function(req,res) {
	let rawdata = fs.readFileSync('Model/tn2.json');
	let modelJson = JSON.parse(rawdata);
	res.send(modelJson);
})

app.get('/group1-shard1of4',function(req,res) {
	let rawdata = fs.readFileSync('Model/group1-shard1of4.bin');
	res.send(rawdata);
})
app.get('/group1-shard2of4',function(req,res) {
	let rawdata = fs.readFileSync('Model/group1-shard2of4.bin');
	res.send(rawdata);
})
app.get('/group1-shard3of4',function(req,res) {
	let rawdata = fs.readFileSync('Model/group1-shard3of4.bin');
	res.send(rawdata);
})
app.get('/group1-shard4of4',function(req,res) {
	let rawdata = fs.readFileSync('Model/group1-shard4of4.bin');
	res.send(rawdata);
})

app.get('/getImage',function(req,res) {
	let rawdata = fs.readFileSync('Model/imageTest3.jpg');
	res.send(rawdata);
})

app.post('/register', (req, res) => {
console.log(req.body)
	const { idPatient,firstName, lastName,
			sexe, cin,gouvernerat,delegation,
			fievre,toux,respiratoire,diarrhee,maux_tete,
	doux_muscule,perte_adorat,perte_appetit,fatigue_inahbituelle,pas_sympthomes } = req.body;
	
	const birthday = new Date(req.body.birthday).toISOString().split('T')[0];

	let errors = []
	if (errors.length > 0) {
	  //render register page again and refill the form
	  errors.forEach(element => { console.log(element.message) })
  
	} else {
	  //Validation pass
	  PatientFrom.findOne({ idPatient: idPatient }).then(patient => {
		if (patient) {
		  //User exist render the veiw again with refilling the fileds 
		  errors.push({ message: "Email is already registered" })
		  errors.forEach(element => { console.log(element.message) })
		  res.send("something went wrong")

		} 
		else 
		{
		  const newPatientForm = new PatientFrom({ idPatient,firstName, lastName, 
			birthday, sexe, cin,gouvernerat,delegation,
			fievre,toux,respiratoire,diarrhee,maux_tete,
		  doux_muscule,perte_adorat,perte_appetit,fatigue_inahbituelle,pas_sympthomes })

		  newPatientForm.save()
  
		  .then(patient => {
			//req.flash('sucess_msg', 'You are now registerd and can log in')
			res.send("good")
		  })
		  .catch(err => console.log(err))
		}
  
	  })
	}
  })

  app.get('/listPatient', function (req, res) {
	PatientFrom.find({},function(err, patients){
	  if(err)
	  {
		res.send('somthing went wrong');
		next();
	  }
	  res.json(patients);
	})
	//return res.status(200).json();
  });


function getRandom(length) {
	return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
}
//const PORT = process.env.PORT || 5000
app.listen(httpPort,console.log('Server started on PORT: '+ httpPort))
