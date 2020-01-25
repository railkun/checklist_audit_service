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
    render json: {
      status: :ok,
      redirect_url: checklists_path
    }
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

  def checklist_params
    params[:data].require(:checklist).permit(:title, :description, questions_attributes: [
        :title, :description
      ]
    )
  end
end
