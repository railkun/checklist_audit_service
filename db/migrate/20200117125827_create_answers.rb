class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.integer :checklist_id
      t.text :comment

      t.timestamps
    end
    add_index :answers, :checklist_id
  end
end
