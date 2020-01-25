class AddChecklistIdToQuestion < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :checklist_id, :integer
  end
end
