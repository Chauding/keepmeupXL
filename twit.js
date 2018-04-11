console.log('Twitter is on');

var twit = require('twit');

var config = require ('./config.js');
var T = new twit(config);
var params = {
    q: '#rainbow',
    count: 50
}
T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    tweets = data.statuses;
   for (var i = 0; i<tweets.length; i++){
     console.log('Tweet number : ' + i);
     console.log('created at: ' + tweets[i].created_at);
     console.log('created by @'+tweets[i].user.screen_name);
     console.log(tweets[i].text);
    }
   // console.log(data.statuses);
};
