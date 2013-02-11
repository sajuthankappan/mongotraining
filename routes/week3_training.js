
/*
 * GET users listing.
 */

var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});

exports.list = function(req, res){
	new mongodb.Db('school', server, {j: false, fsync: false, w: 0}).open(function dbOpen(error,client) {
		if (error) throw error;

		var collection = new mongodb.Collection(client, 'students');
		var scores;
		var lowHomeworkScore;
		var removeIt;
		collection.find({}).toArray(function studentsFind(err, docs) {
			for (var i=0; i < docs.length; i++) {
				console.log("processing student %d...", i);
				lowHomeworkScore = 100;
				scores = docs[i].scores;
				for (var j=0; j < scores.length; j++) {
					if (scores[j].type = 'homework') {
						if (scores[j].score < lowHomeworkScore ) {
							lowHomeworkScore = scores[j].score;
							removeIt = scores[j];
						}
					}
				}
				if (lowHomeworkScore > 0) {
					debugger;
					console.log('found low score %d', lowHomeworkScore);
					collection.update({_id: docs[i]._id}, {$pull: {scores: removeIt}});
					console.log('removed score %j', removeIt);
				}
			}

			//console.log("%j", docs);
		});
		
	});
	res.send('week 3 training');
};
