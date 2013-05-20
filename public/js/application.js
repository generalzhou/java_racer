$(document).ready(function() {
  
  var player_1 = $('#player1_strip > td.player_name').text();
  var player_2 = $('#player2_strip > td.player_name').text();

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
    
    var elapsed_time = 0;

    setInterval(function() { elapsed_time++ }, 1 )
    var winner = null;
    setTimeout(function() {

      $(document).keydown(function(event) {
        if (winner == null) {
          var player_1_won = $('#player1_strip').find('td').last().hasClass('active');
          var player_2_won = $('#player2_strip').find('td').last().hasClass('active');
          if (player_1_won) {
            console.log(elapsed_time)
            $.post('/racer/game_finished', {'winner':player_1, 'loser':player_2, 'elapsed_time':elapsed_time}, function(data){
              location.href = data
            });
            winner = 'player1'; 

          }
          else if (player_2_won) {
            console.log(elapsed_time)
            
            $.post('/racer/game_finished', {'winner':player_2, 'loser':player_1, 'elapsed_time':elapsed_time} , function(data){
              location.href = data
            });
            winner = 'player2';  
          } else {
            if (event.keyCode == 80) {
              $('#player1_strip').find('td.active').next().addClass('active').animate();
              $('#player1_strip').find('td.active').first().removeClass();
            }
            else if (event.keyCode == 82) {
              $('#player2_strip').find('td.active').next().addClass('active');
              $('#player2_strip').find('td.active').first().removeClass();
            }
          }  
        }
        
      });
    }, 3000);


});

