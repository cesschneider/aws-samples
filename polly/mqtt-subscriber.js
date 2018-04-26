var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://<YOUR_MQTT_BROKER>')

client.on('connect', function () {
  client.subscribe('<YOUR_THING_ID>')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())

	child = exec("aws polly synthesize-speech --text-type text --text "+ message.toString() +"--output-format mp3 --voice-id Vitoria speech.mp3", function (error, stdout, stderr) {
	  sys.print('stdout: ' + stdout);
	  sys.print('stderr: ' + stderr);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  }
	  child = exec("play speech.mp3", function (error, stdout, stderr) {
	    sys.print('stdout: ' + stdout);
	    sys.print('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	  });
	});
	
  client.end()
})
