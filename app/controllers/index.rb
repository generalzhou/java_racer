get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/racer' do
  player_1 = Player.find_or_create_by_name(params[:player_1])
  player_2 = Player.find_or_create_by_name(params[:player_2])
  erb :racer, :locals => {:player_1 => player_1, :player_2 => player_2}
end

post '/racer/game_finished' do
  # "#{params.inspect} + #{params[:winner].class} + #{params[:loser].class}"
  winner = Player.find_by_name(params[:winner].strip)
  loser = Player.find_by_name(params[:loser].strip)
  game = Game.create!(:winner => winner, :loser => loser, :winning_time => params[:elapsed_time])
  "/game/#{game.id}"
end

get '/game/:id' do
  @game = Game.find(params[:id])
  @winner = @game.winner
  @loser = @game.loser
  erb :game_finished
end

