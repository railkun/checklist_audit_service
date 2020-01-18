class Answer < ApplicationRecord
  SELECTED_QUESTION = %w(yes not na).freeze

  belongs_to :audit
  belongs_to :question

  validates :comment, presence: true, length: { maximum: 12 }
  validates :selected_question, presence: true, inclusion: {in: SELECTED_QUESTION}
end
