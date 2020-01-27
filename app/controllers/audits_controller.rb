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
    @audit = Audit.new(checklist_id: params[:checklist_id])
    @checklist = @audit.checklist
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
    @checklist = @audit.checklist
  end

  def update
    @audit = Audit.find(params[:id])

    @audit.update(audit_params)
    render json: {
      status: :ok,
      redirect_url: audits_path
    }
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
