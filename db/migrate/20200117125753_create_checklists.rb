class CreateChecklists < ActiveRecord::Migration[5.2]
  def change
    create_table :checklists do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
