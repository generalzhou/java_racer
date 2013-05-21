function Player(name) {
  this.name = name;
  this.position = 1;

  this.advance = function() {
    this.position ++;
    console.log(this.name + ' : ' + this.position )
  }
}



function Game(player1, player2) {

  this.player1 = player1;
  this.player2 = player2;
  this.elapsed_time = 0;
  this.started = false;
  this.board_length = 32;

  this.startTimer = function() {
    setInterval(function() { this.elapsed_time++ }, 1 )
  }

  this.endTime = function() {
    this.winning_time = this.elapsed_time
  }

  this.isThereAWinner = function() {    
    
    if (player1.position == this.board_length) {
      alert('winnder 1');
      this.win(player1.name, player2.name, elapsed_time);
      return true;
    } else if (player2.position == this.board_length) {
      alert('winnder 2');
      this.win(player2.name, player1.name, elapsed_time);
      return true;
    } else {
      return false;
    }
  }

  this.render = function() {
    $(".racer_table td.active").removeClass();
    $($('#player1_strip').find('td')[this.player1.position]).addClass('active');
    $($('#player2_strip').find('td')[this.player2.position]).addClass('active');
  }

  this.win = function(winner, loser, elapsed_time) {
    $.post('/racer/game_finished', {'winner':winner, 'loser':loser, 'elapsed_time':elapsed_time}, function(data){
      console.log(data)
      location.href = data;
    });
  }

  this.advanceAllPlayers = function(keycode) {
    if (keycode == 80) {
      player1.advance();
    } else if (keycode == 82) {
      player2.advance();
    }
    this.render();
  }

  this.advancePlayer = function(player_id) {
    $(player_id).find('td.active').next().addClass('active');
    $(player_id).find('td.active').first().removeClass();
  }

  this.countDown = function(this_obj) {

    $('h3.timer').html('3')

    setTimeout(function(){
      $('h3.timer').html('2')
    }, 1000);
    
    setTimeout(function(){
      $('h3.timer').html('1')
    }, 2000);

    setTimeout(function(){
      
      $('h3.timer').html('GOO!O!O!O!!!!!!!!!!!!');
      this_obj.startTimer();
      this_obj.started = true;
    }, 3000);

  }
 
}


$(document).ready(function() {

  
  var player1 = new Player($('#player2_strip > td.player_name').text());
  var player2 = new Player($('#player1_strip > td.player_name').text());
  // var player_array = []
  // var num_players = $('tr').find().length
  // var all_rows = $('table > tr')
  
  // for(i = 0; i<=num_players; i++) {
  //   player_array[i] = new Player($('').text());
  // }
  // var game = new Game(player1, player2)
  
  game.countDown(game);
  

  $(document).keydown(function(event) {
    if (game.started && !game.isThereAWinner()) {
      game.advanceAllPlayers(event.which);
    }

  });

});

