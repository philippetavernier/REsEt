define(['child_process', 'serialport'], function(child, serialport) {
  var serial = {
    'connect': function(socket) {
      board = new serialport.SerialPort('/dev/ttyUSB1', {
        baudrate: 9600,
        parser: serialport.parsers.readline("\n")
      });
      /*serial = new SerialPort(port, {
      baudrate: 9600
    });*/
      var interval = 10;
      var io = socket;
      board.on('data', function(data) {
        data = data.toString();
        if (data.replace(/^\s*([\S\s]*?)\s*$/, '$1') != "") {
          io.sockets.emit('msg', data); }
      });

      io.sockets.on('connection', function (socket) {
        socket.on('browser slider1', function (msg) {
          console.log("DATA!!on!!serial");    
          console.log("x"+msg);
          board.write("x"+parseInt(msg));
        });
        socket.on('browser slider2', function (msg) {
          console.log("DATA!!on!!serial");    
          console.log("y"+msg);
          board.write("y"+parseInt(msg));
        });
      });  
    }
  };

  return serial;
});
