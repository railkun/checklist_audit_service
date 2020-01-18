class CreateAudits < ActiveRecord::Migration[5.2]
  def change
    create_table :audits do |t|
      t.integer :id_question
      t.integer :id_answer

      t.timestamps
    end
  end
end
