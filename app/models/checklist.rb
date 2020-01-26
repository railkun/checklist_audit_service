class Checklist < ApplicationRecord
  has_many :audits
  has_many :questions, dependent: :destroy

  validates :title, presence: true, length: { maximum: 40 }
  validates :description, presence: true

  accepts_nested_attributes_for :questions, :allow_destroy => true, update_only: true

  def props
    attributes.merge({'questions' => questions.map{ |q| q.attributes }})
  end
end
