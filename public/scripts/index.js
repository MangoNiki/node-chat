var socket = io.connect();

$(function() {
    var chatApp = new Chat(socket);

    $("#send-btn").on('click',function(e){
    	var message = $('#send-message').val();
    	chatApp.sendMessage('Mango','Hello Niki');
    });
});
