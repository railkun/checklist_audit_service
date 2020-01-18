class Checklist < ApplicationRecord
  has_many :audits
  has_many :questions

  validates :title, presence: true
  validates :title, length: { maximum: 40 }
  validates :description, presence: true
end
