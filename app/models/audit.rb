class Audit < ApplicationRecord
  belongs_to :checklist
  has_many :answers, dependent: :destroy

  accepts_nested_attributes_for :answers, :allow_destroy => true

  def props
    attributes.merge({'answers' => answers.map{ |a| a.attributes }})
  end
end
