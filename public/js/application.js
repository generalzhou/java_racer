$(document).ready(function() {
  // countDown();
  // winner = runGame();
  // reportWinner(winner);
  
  var player_1 = $('#player1_strip > td.player_name').text();
  var player_2 = $('#player2_strip > td.player_name').text();

  countDown();    
  
  var elapsed_time = 0;

  setInterval(function() { elapsed_time++ }, 1 )

  setTimeout(function() {
    $(document).keydown(function(event) {
      playGame(event, player_1, player_2, elapsed_time);
      
    });
  }, 3000);
});
chrome

function startTimer(elapsed_time) {
  setInterval(function() { elapsed_time++ }, 1 )
}

function playGame(event, player_1, player_2, elapsed_time) {    
  
  if (isWinner('#player1_strip')) {
    win(player_1, player_2, elapsed_time);
  } else if (isWinner('#player2_strip')) {
    win(player_2, player_1, elapsed_time);
  } else {
    advanceAllPlayers(event)
  }  
}

function isWinner(player_table_id) {
  return $(player_table_id).find('td').last().hasClass('active');
}

function win(winner, loser, elapsed_time) {
  $.post('/racer/game_finished', {'winner':winner, 'loser':loser, 'elapsed_time':elapsed_time}, function(data){
    location.href = data
  });
}

function advanceAllPlayers(keypress_listener) {
  if (event.keyCode == 80) {
    advancePlayer("#player1_strip");
  }
  else if (event.keyCode == 82) {
    advancePlayer('#player2_strip');
  }
}

function advancePlayer(player_id) {
  $(player_id).find('td.active').next().addClass('active');
  $(player_id).find('td.active').first().removeClass();
}

function countDown() {
  $('h3.timer').html('3')

  setTimeout(function(){
    $('h3.timer').html('2')
  }, 1000);
  
  setTimeout(function(){
    $('h3.timer').html('1')
  }, 2000);

  setTimeout(function(){
    $('h3.timer').html('GOO!O!O!O!!!!!!!!!!!!') 
  }, 3000);
}
