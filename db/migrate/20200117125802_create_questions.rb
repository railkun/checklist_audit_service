class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.integer :checklist_id
      t.string :title
      t.string :description

      t.timestamps
    end

    add_index :questions, :checklist_id
  end
end
