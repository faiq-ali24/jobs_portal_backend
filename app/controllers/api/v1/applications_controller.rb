module Api
  module V1
    class ApplicationsController < ApplicationController
      
      load_and_authorize_resource :job, only: [:create, :index, :show]
      load_and_authorize_resource :application, through: :job, only: [:create, :index, :show]
      

      def create
        # byebug
        if params[:application][:document].present?
          @application.build_document(file: params[:application][:document])
        end
        if @application.save
          JobApplicationMailer.with(application: @application).created_email.deliver_later
          render json: ApplicationSerializer.new(@application).
          serializable_hash, status: :ok
        else
          render json: {errors: @application.errors.full_messages}, status: :unprocessable_entity
        end
      end

      def show
        render json: ApplicationSerializer.new(@application).serializable_hash, status: :ok
      end

      def index
        # byebug

        @q = @applications.ransack(params[:q])
        @applications = @q.result(distinct: true)

        render json: ApplicationSerializer.new(@applications).serializable_hash, status: :ok
      end

      def destroy
        @application = Application.find(params[:id])
        authorize! :destroy, @application 
        @application.destroy
        render json: { message: "Application deleted successfully" }, status: :ok
      end

      def get_all # http://127.0.0.1:3001/api/v1/applications/get_all
        # byebug
        if Current.company == nil || current_user.company?
          @applications = Application.accessible_by(current_ability)
        else
          @applications = Application.joins(:job)
                         .where(jobs: { company_id: Current.company.id }, user_id: current_user.id)
        end
        @q = @applications.ransack(params[:q])
        @applications = @q.result(distinct: true)

        @applications.each { |app| authorize! :read, app }

        render json: ApplicationSerializer.new(@applications).serializable_hash, status: :ok
      end


      

      def change_status
        # byebug
        if Current.company == nil
          return render json: { error: "Forbidden access" }, status: :forbidden
        end
        @application = Application.find_by(id: params[:id], company_id: Current.company.id)
        authorize! :change_status, @application
        
        if @application.update(status: params[:status])
          JobApplicationMailer.with(application: @application).status_changed_email.deliver_later
          render json: ApplicationSerializer.new(@application).serializable_hash, status: :ok
        else
          render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
        end
      end


      def application_params
        params.require(:application).permit(:cgpa, :yoe, :name, :age)
      end
    end
  end

end