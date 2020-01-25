class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.integer :audit_id
      t.integer :question_id
      t.string :value
      t.text :comment

      t.timestamps
    end
    add_index :answers, :audit_id
    add_index :answers, :question_id
  end
end
