class Answer < ApplicationRecord
  SELECTED_QUESTION = %w(yes no NA).freeze

  belongs_to :audit
  belongs_to :question

  validates :comment, presence: true, length: { minimum: 12 }
  validates :value, presence: true, inclusion: {in: SELECTED_QUESTION}
end
