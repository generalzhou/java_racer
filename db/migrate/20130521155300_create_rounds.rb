class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.references :games
      t.references :players
      t.decimal :time
    end
  end
end
