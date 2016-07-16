/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $('#sender').on('click', function() {
   socket.emit('message', {
      prop1: "value1"
   });
  });

  $('#textField').on('keyup', function(e) {
    var value = e.currentTarget.value;

    if (value) {
      delay(function(){
        socket.emit('message', {
          text: value
        });
      }, 500 );
    }
  })

  $('body').on('click', 'li', function () {
    var $this = $(this);
    var id = $this.data('id');

    socket.emit('getGame', {
      id: id
   });
  });

  socket.on('server_message_game', function(data) {
    $('#receiver').html('');
    $('#receiver').after('<p><pre>' + JSON.stringify(data, null, 4) + '</pre></p>');
  });

  socket.on('server_message', function(data) {
    $('#receiver').html('');
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      $('#receiver').append('<li data-id="' + item.id + '">' + item.title + ' - ' + item.platform + '</li>');  
    }
  });
});