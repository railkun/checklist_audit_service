class ChecklistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @checklists = Checklist.all
  end

  def show
    @checklist = Checklist.find(params[:id])
  end

  def new
    @checklist = Checklist.new
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
    @checklist = Checklist.find(params[:id])

    @checklist.update(checklist_params)
    render json: {
      status: :ok,
      redirect_url: checklists_path
    }
  end

  def destroy
    @checklist = Checklist.find(params[:id])
    @checklist.destroy
    render json: {
      status: :ok,
      redirect_url: checklists_path
    }
  end

  private

  def checklist_params
    params.require(:checklist).permit(:title, :description, questions_attributes: [
        :id, :title, :description
      ]
    )
  end
end
