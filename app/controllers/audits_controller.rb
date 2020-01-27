class AuditsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @audits = Audit.all
    @checklists = Checklist.all
  end

  def show
    @audit = Audit.find(params[:id])
  end

  def new
    @checklist = Checklist.find(params[:checklist_id])
  end

  def create
    @audits = Audit.create(audit_params)
    render json: {
      status: :ok,
      redirect_url: audits_path
    }
  end

  def edit
    @audit = Audit.find(params[:id])
    @checklist = Checklist.find(@audit.checklist_id)
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
    @audit = Audit.find(params[:id])
    @audit.destroy
    render json: {
      status: :ok,
      redirect_url: audits_path
    }
  end

  private

  def audit_params
    params.require(:audit).permit(:checklist_id, answers_attributes: [
        :id, :comment, :value, :question_id
      ]
    )
  end
end
