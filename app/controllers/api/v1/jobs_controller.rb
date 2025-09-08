# app/controllers/api/v1/jobs_controller.rb
module Api
  module V1
    class JobsController < ApplicationController
      load_and_authorize_resource

      def index
        # byebug
        @q = @jobs.ransack(params[:q])
        @jobs = @q.result(distinct: true).page(params[:page]).per(params[:per_page] || 10)
        render json: {
          jobs: JobSerializer.new(@jobs).serializable_hash[:data],
          meta: pagination_meta(@jobs)
        }, status: :ok
      end

      def create
        if params[:job][:document].present?
          @job.build_document(file: params[:job][:document])
        end

        if @job.save
          render json: JobSerializer.new(@job).serializable_hash, status: :created
        else
          render json: { errors: @job.errors.full_messages }, status: :unprocessable_entity
        end
      end



      def show
        # byebug
        render json: JobSerializer.new(@job).serializable_hash, status: :ok
      end




      def update

        if params[:job][:document].present?
          @job.build_document(file: params[:job][:document])
        end
        if @job.update(job_params)
          render json: JobSerializer.new(@job).serializable_hash, status: :ok
        else
          render json: { errors: @job.errors.full_messages }, status: :unprocessable_entity
        end
      end




      def destroy
        @job.destroy
        head :no_content
      end




      private

      def job_params
        params.require(:job).permit(:title, :description, :salary, :location)
      end




      def pagination_meta(collection)
        {
          current_page: collection.current_page,
          next_page: collection.next_page,
          prev_page: collection.prev_page,
          total_pages: collection.total_pages,
          total_count: collection.total_count
        }
      end
    end
  end
end
