define(['socket.io','./web'], function(socketio, app) {
  var io = socketio.listen(app);
  //////////////////////
  io.sockets.on('connection', function (socket) {
      socket.on('browser slider1', function (msg) {
          //message dans le terminal
          console.log("DATA!!on!!serial");    
          console.log("x"+msg);
          //send_serial(msg);
          //clearInterval(interval);
          //serial.write("x"+msg);    //ok if we don't use the slider to quickly
      });
  });
  ////////////////////////
  return io;
});