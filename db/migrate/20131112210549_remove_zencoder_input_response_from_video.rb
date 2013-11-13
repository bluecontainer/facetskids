class RemoveZencoderInputResponseFromVideo < ActiveRecord::Migration
  def change
    change_table :videos do |t|
      t.remove :zencoder_input_response
    end
  end
end
