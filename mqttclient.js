const mqtt = require('mqtt');        
const fs = require('fs');
var host =  '192.168.2.185' // Office wifi
const port = 1883;

const options = {
    port: 1883,
    host: host,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: '',
    password: '',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
//const host = '192.168.10.11' // internal UAV- network
var client = mqtt.connect('mqtt://'+host+':'+port, options);
client.on('connect', function() { // When connected
    console.log('connected to mqtt broker'+'on {'+host+'} port '+port);
    // subscribe to a topic
   setInterval(() => {
      
 
    client.subscribe('#', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message) {
            try{
                  setInterval(()=>{
            const json = JSON.stringify(message);
            //console.log(topic.concat(json));
            console.log("Received Json String: " + json + "' on '" + topic + "'");
            const obj = JSON.parse(json);
            console.log(obj.data);
            const joystickData = obj.data;
            if(topic == 'joystick/data'){
                var payload = obj.data;
               // var payload = message.payloadBytes;
                 var buffer = new ArrayBuffer(48);
                 var byteview = new Uint8Array(buffer);
                 for(var i = 0; i < byteview.length; ++i) {
                   byteview[i] = payload[i];
                 }
                   //engine_timeout_counter = 0;
                 //engine_timeout_val     = 0;
                
                 var view = new DataView(buffer, 0);
                 
                 
                 var joystick_leftright   = view.getFloat32(0, true);
                 var joystick_fwdback     = view.getFloat32(4, true);
                 var joystick_yaw         = view.getFloat32(8, true);
                 var joystick_throttle    = view.getFloat32(12, true);
                 var joystick_button1     = view.getInt16(16, true);
                 var joystick_button2     = view.getInt16(18, true);
                 var joystick_button3     = view.getInt16(20, true);
                 var joystick_button4     = view.getInt16(22, true);
                 var joystick_button5     = view.getInt16(24, true);
                 var joystick_button6     = view.getInt16(26, true);
                 var joystick_button7     = view.getInt16(28, true);
                 var joystick_button8     = view.getInt16(30, true);
                 var joystick_button9     = view.getInt16(32, true);
                 var joystick_button10    = view.getInt16(34, true);
                 var joystick_button11    = view.getInt16(36, true);
                 var joystick_button12     = view.getInt16(38, true);
                 var joystick_leftrighthat = view.getFloat32(40, true);
                 var joystick_fwdbackhat   = view.getFloat32(44, true);
                    console.log(joystick_throttle);
                    console.log(joystick_button1);
                }
            
console.log(bind_header(joystickHeader,joystickData));
        },5000);
    }
    catch(err){
            console.log('error'+err);
    }
            ////////////////////

 
// fs.writeFile("./output.json", json, 'utf8', function (err) {
    
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
 
//     console.log("JSON file has been saved.");
// });

///////////////////
        });
    });
}, 1000);

    // // publish a message to a topic
    // client.publish('#', 'my message', function() {
    //     console.log("Message is published");
    //     client.end(); // Close the connection when published
    // });
});

// if error
client.on('error', () => {
    console.log('Error occured'+error);

});

// declare joystick headers (keys) and bind them with received data:
const joystickHeader = [
    'leftright_cmd',
    'fwdback_cmd',
    'yaw_cmd',
    'thrust_cmd',
    'button1',
    'button2',
    'button3',
    'button4',
    'button5',
    'button6',
    'button7',
    'button8',
    'button9',
    'button10',
    'button11',
    'button12',
    'leftrighthat_cmd',
    'fwdbackhat_cmd'

];

//binding function: usage bind_header(array1,array2);
//@ array1 => keys array
//@array2 => values from parsed message

bind_header = (array1,array2) => {
    // var originalData = [1,2,3];
    // var newData = [3,1,2];
    // var newOrderObject = originalData.reduce(function(acc, item, i) {
    //     return Object.assign(acc, { [item]: newData[i] })
    //   }, {});
    //   console.log(newOrderObject)
    // {
    //     "1": 3,
    //     "2": 1,
    //     "3": 2
    //   }
    console.log("\n");
    console.log(array1);
    console.log(array2);
    const result = array2.reduce(function(acc, item, i){
        return Object.assign(acc, { [item]: array2[i]})
    }, {});
    

};


// last debug console message :
// Received Json String: {"type":"Buffer","data":[0,0,0,0,0,0,0,0,0,0,0,0,0,254,127,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}' on 'joystick/data'
// [
//   0, 0,   0,   0,  0, 0, 0, 0, 0, 0, 0,
//   0, 0, 254, 127, 63, 0, 0, 0, 0, 0, 0,
//   0, 0,   0,   0,  0, 0, 0, 0, 0, 0, 0,
//   0, 0,   0,   0,  0, 0, 0, 0, 0, 0, 0,
//   0, 0,   0,   0
// ]


// [
//   'leftright_cmd',    'fwdback_cmd',
//   'yaw_cmd',          'thrust_cmd',
//   'button1',          'button2',
//   'button3',          'button4',
//   'button5',          'button6',
//   'button7',          'button8',
//   'button9',          'button10',
//   'button11',         'button12',
//   'leftrighthat_cmd', 'fwdbackhat_cmd'
// ]
// [
//   0, 0,   0,   0,  0, 0, 0, 0, 0, 0, 0,
//   0, 0, 254, 127, 63, 0, 0, 0, 0, 0, 0,
//   0, 0,   0,   0,  0, 0, 0, 0, 0, 0, 0,
//   0, 0,   0,   0,  0, 0, 0, 0, 0, 0, 0,
//   0, 0,   0,   0
// ]
// undefined