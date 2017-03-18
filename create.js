const mongodb = require('mongodb');
const client = mongodb.MongoClient;

client.connect('mongodb://localhost:27017/mongodb_mapreduce_example').then( (db) => {

let count = 0;
let arrayData = [];


while(count <= 6 ) {
 var data = generateData();
 arrayData.push({
    "hour": new Date(2017,1,1,count),
 	  "minutesSecondsData": data
 });
 
 count++; 
}

db.collection('example').insertMany(arrayData).then( () => {
  console.log('data inserted');
});


function generateData(){
      var minutesData = {}; 
      var minutes = 1;
      while(minutes <= 59) {
        var seconds = 1;
        minutesData[minutes] = {};
        while (seconds <= 59){
          minutesData[minutes][seconds] = getRandomInt(2,100);
          seconds++;
        }   
         minutes++;
      }
      return minutesData;
}


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

}).catch(err => {
	console.log(err);
});