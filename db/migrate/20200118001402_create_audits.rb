class CreateAudits < ActiveRecord::Migration[5.2]
  def change
    create_table :audits do |t|
      t.integer :checklist_id

      t.timestamps
    end
    add_index :answers, :checklist_id
  end
end
