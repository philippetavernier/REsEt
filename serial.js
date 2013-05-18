define(['child_process', 'serialport'], function(child, serialport) {
  var serial = {
    'connect': function(socket) {
      board = new serialport.SerialPort('/dev/ttyUSB0', {
        baudrate: 9600,
        parser: serialport.parsers.readline("\n")
      });
      
      var io = socket;
      board.on('data', function(data) {
        data = data.toString();
        if (data.replace(/^\s*([\S\s]*?)\s*$/, '$1') != "") {
          io.sockets.emit('msg', data); }
      });

      io.sockets.on('connection', function (socket) {
        socket.on('browser slider1', function (msg) {
          //message dans le terminal
          console.log("DATA!!on!!serial");    
          console.log("x"+msg);
          //io.sockets.emit("slider X")
          //send_serial(msg);
          //clearInterval(interval);
          //serial.write("x"+msg);    //ok if we don't use the slider to quickly
        });
      });  
    }
  };

  return serial;
});
