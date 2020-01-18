class Question < ApplicationRecord
  belongs_to :checklist
  has_many :answers

  validates :title, presence: true, length: { in: 12..40 }
  validates :desription, presense: true
end
