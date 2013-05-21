get '/' do
  erb :index
end

post '/player_count' do 
  @count = params[:num_players].to_i
  erb :index
end

post '/racer' do
  @players =[]
  params.each do |player, name|
    @players << Player.find_or_create_by_name(name)
  end
  erb :racer
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

