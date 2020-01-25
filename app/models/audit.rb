class Audit < ApplicationRecord
  belongs_to :checklist
  has_many :answers, dependent: :destroy

  accepts_nested_attributes_for :answers, allow_nil: false, :allow_destroy => true
end
