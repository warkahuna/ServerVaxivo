const express = require ('express');

const app = express();
const httpPort=3000;
const tf = require ('@tensorflow/tfjs');
const fetch = require("node-fetch");
const fs = require('fs');
const { Image, createCanvas,canvas } = require('canvas');


/*const path = "model.json"
const mn = new mobilenet.MobileNet(1, 1);
mn.path = `file://${path}`*/
//const handler = tf.io.browserFiles("C://Users/AGRO/Downloads/model.json");


app.use(function(req,res,next){
	
	res.header ("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X Requested-with, Content-Type,Accept");
	next();
})

app.get('/getModel',function(req,res) {
	//res.send("Hello World from new NodeJs Project");
	let rawdata = fs.readFileSync('Models/model.json');
	let modelJson = JSON.parse(rawdata);
	res.send(modelJson);
})

app.get('/group1-shard1of4',function(req,res) {
	//res.send("Hello World from new NodeJs Project");
	let rawdata = fs.readFileSync('Models/group1-shard1of4.bin');
	//let modelJson = JSON.parse(rawdata);
	res.send(rawdata);
})
app.get('/group1-shard2of4',function(req,res) {
	//res.send("Hello World from new NodeJs Project");
	let rawdata = fs.readFileSync('Models/group1-shard2of4.bin');
	//let modelJson = JSON.parse(rawdata);
	res.send(rawdata);
})
app.get('/group1-shard3of4',function(req,res) {
	//res.send("Hello World from new NodeJs Project");
	let rawdata = fs.readFileSync('Models/group1-shard3of4.bin');
	//let modelJson = JSON.parse(rawdata);
	res.send(rawdata);
})
app.get('/group1-shard4of4',function(req,res) {
	//res.send("Hello World from new NodeJs Project");
	let rawdata = fs.readFileSync('Models/group1-shard4of4.bin');
	//let modelJson = JSON.parse(rawdata);
	res.send(rawdata);
})

app.get('/getImage',function(req,res) {
	//res.send("Hello World from new NodeJs Project");
	let rawdata = fs.readFileSync('Models/imageTest3.jpg');
	//let modelJson = JSON.parse(rawdata);
	res.send(rawdata);
})


var model;
app.get('/loadModel', function (req, res) {
	
	/*const model = tf.sequential();
	model.add(tf.layers.dense({ units: 1, inputShape: [200] }));
	model.compile({
	  loss: 'meanSquaredError',
	  optimizer: 'sgd',
	  metrics: ['MAE']
	});
	
	
	// Generate some random fake data for demo purpose.
	const xs = tf.randomUniform([10000, 200]);
	const ys = tf.randomUniform([10000, 1]);
	const valXs = tf.randomUniform([1000, 200]);
	const valYs = tf.randomUniform([1000, 1]);
	
	
	// Start model training process.
	async function train() {
	  await model.fit(xs, ys, {
		epochs: 100,
		validationData: [valXs, valYs],
		// Add the tensorBoard callback here.
		callbacks: tf.node.tensorBoard('/tmp/fit_logs_1')
	  });
	}
	train();*/

	(async () => {
		
		 model = await tf.loadLayersModel('http://localhost:3000/getModel');
		 /*var myImage = new canvas.Image;
		 myImage.crossOrigin = "anonymous";
		 myImage.src = 'http://localhost:3000/getImage';*/
			
		 const pred = model.predict(preprocess("http://localhost:3000/getImage")).dataSync();
	    console.log(pred);
		/*const example = tf.fromPixels(webcamElement);  // for example
const prediction = model.predict(example);*/
        //const model = await tf.node.loadSavedModel("C://Users/AGRO/Downloads/model.json");
		//model = await tf.node.loadSavedModel('model.json');
		//model = await tf.node.loadSavedModel('model.json');
		//model = await tf.node.getMetaGraphsFromSavedModel('C://Users/AGRO/Downloads/model.json');
		 //await mn.load()
		// console.log(model);
	 })();

	  function convertImageToCanvas(image) {
		const width = 300;
		const height = 300;
		const canvas = createCanvas(width, height);
		console.log(image);
		canvas.getContext("2d").drawImage(image, 0, 0);
	
		return canvas;
	}

	function preprocess(img)
    {

    //convert the image data to a tensor 
    let tensor = tf.browser.fromPixels(img)
    //resize to 50 X 50
    const resized = tf.image.resizeBilinear(tensor, [50, 50]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched
    }
	const pred = model.predict(preprocess("D:\Servers\VaxivoServer\Models\imageTest.jpg")).dataSync();
	console.log(pred);
	
	/*console.log(model)
	function preprocess(img) {

		//convert the image data to a tensor 
		let tensor = tf.fromPixels(img)
		//resize to 50 X 50
		const resized = tf.image.resizeBilinear(tensor, [50, 50]).toFloat()
		// Normalize the image 
		const offset = tf.scalar(255.0);
		const normalized = tf.scalar(1.0).sub(resized.div(offset));
		//We add a dimension to get a batch shape 
		const batched = normalized.expandDims(0)
		return batched

	}
	const pred = model.predict(preprocess(img)).dataSync();
	console.log(pred);

	res.send("Hello World from new NodeJs Project");*/
})

//const PORT = process.env.PORT || 5000
app.listen(httpPort,console.log('Server started on PORT: '+ httpPort))
