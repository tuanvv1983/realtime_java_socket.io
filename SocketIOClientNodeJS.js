var util = require('util');
//var socket = require('socket.io-client')('https://io.tradingeconomics.com?app=te&token=20171116',{origins:"*"});
//var socket = require('socket.io-client')('https://sodatafeed1.vps.com.vn',{transports: [ 'websocket' ]}); //OK
//var socket = require('socket.io-client')('https://sodatafeed1.vps.com.vn');// err-> transport error
//var socket = require('socket.io-client')('https://spdatafeed1.vps.com.vn',{transports: [ 'websocket' ]}) //OK
//var socket = require('socket.io-client')('https://io.tradingeconomics.com');
var socket = require('socket.io-client')('https://io.tradingeconomics.com?app=te&token=20171116',{transports: [ 'websocket' ], reconnect: true});
//var socket = require('socket.io-client')('https://io.tradingeconomics.com?app=te&token=20171116');
//var socket = io('http://localhost:3000',{origins:"*"});
//var socket = require('socket.io-client')('http://localhost:30000');
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
util.log("start");
socket.on('connect', function(){
    util.log("connected socket-> " + socket.id);	
    var _lag0 = 'seconds:2';
    var TEChannels = ['calendar','indexes'];    //var TEChannels = ['calendar','indexes','currencies','commodities','bonds','market'];    
    console.log('IO SUBSCRIBE TO ' + TEChannels, _lag0);
    socket.emit('subscribe', { s: TEChannels, lag: _lag0 });

});


socket.on('indexes',(data) =>{
    util.log("indexes data: " + JSON.stringify(data) );
});
socket.on('disconnect', (reason) => {
    util.log("disconnect socket-> " + socket.id);	
    if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        util.log("disconnect socket by SRV-> reason-> " + reason);	
        socket.connect();//Reconnect
    } 
    else{
        util.log("disconnect socket-> reason-> " + reason);	
    }
});

// socket.on('stockps', (data) => {
//     util.log("data from stockps-> " + JSON.stringify(data));	
// });


  socket.emit('regs', '{\"action\": \"join\",\"list\": \"FLC,SSI,CTS,CEO,MBB\"}');

  socket.on('stock', (dataget) => {
    //util.log("data from stock-> " + JSON.stringify(dataget));	    
    if(dataget.data.sym == 'FLC' || dataget.data.sym == 'MBB')
    {
        util.log("data from stock-> " + JSON.stringify(dataget));
    }
  });

