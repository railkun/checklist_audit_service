class Audit < ApplicationRecord
  belongs_to :checklist
  has_many :answers

  accepts_nested_attributes_for :answers, allow_nil: false 
end
