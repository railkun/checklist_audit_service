class ChecklistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @checklists = Checklist.all
  end

  def show
    @checklist = Checklist.find(params[:id])
  end

  def new
  end

  def create
    @checklist = Checklist.create(checklist_params)
  end

  def edit
    @checklist = Checklist.find(params[:id])
  end

  def update
    @question = Question.new(question_params)
    if @question.save
      @checklist.update(checklist_params)
    else
      return
    end
  end

  def destroy
    @checklist = Checklist.find(params[:id])
    @checklist.destroy
  end

  private

  def question_params
    params.require(:questions).permit(:title, :description, :checklist_id)
  end

  def checklist_params
    params.require(:checklist).permit(:title, :description)
  end
end
