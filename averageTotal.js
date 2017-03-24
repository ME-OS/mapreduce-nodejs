const mongodb = require('mongodb');
const client = mongodb.MongoClient;

client.connect('mongodb://localhost:27017/mongodb_mapreduce_example').then( (db) => {
	let options = {
		query: { hour: { '$gte': new Date(2017,0,1) } },
		out: {
			replace: 'outCollection'
		}
	};
	db.collection('example').mapReduce(mapFunction,reduceFunction,options).then( ()=>{
		console.log('function completed');
	});

}).catch(err=>{
	console.log(err);
});


function mapFunction(){
	let hour = this.hour;
	let total = 0;
	let average = 0;
	 for(let minute in this.minutesSecondsData){
 		for(let second in this.minutesSecondsData[minute]){
 			total += this.minutesSecondsData[minute][second];
		}

 	}
	 average = total/360;
     let date = this.hour.setUTCHours(0);
	 emit(this.hour,{ total: total, average: average });
}

function reduceFunction(key,values){
	let final = { total: 0, average: 0 }
	for(let item in values ){
	  final.total += item.total;
	  final.average +=item.average;
	}
	final.average = final.average/values.length;
	return final;
}