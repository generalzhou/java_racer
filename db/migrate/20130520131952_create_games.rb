class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.references :rounds
      t.integer :winning_time
      t.timestamps
    end
  end
end
