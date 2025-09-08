module Api
  module V1
    class UsersController < ApplicationController
      def me
        # byebug
        authorize! :read, current_user
        render json: UserSerializer.new(current_user).serializable_hash, status: :ok
      end

      def show
        @user = User.find(params[:id])
        authorize! :read, @user
        render json: UserSerializer.new(@user).serializable_hash, status: :ok
      end

      def get_companies
        @users = User.where(role: "company")
        @users.each { |u| authorize! :read, u }
        render json: UserSerializer.new(@users).serializable_hash, status: :ok
      end

      def get_all 
        @users = User.accessible_by(current_ability)
        render json: UserSerializer.new(@users).serializable_hash, status: :ok
      end

      def destroy
        user = User.find(params[:id])
        authorize! :destroy, user

        if user.destroy
          render json: { status: { code: 200, message: "User deleted successfully." } }, status: :ok
        else
          render json: { status: { message: "User couldn't be deleted. #{user.errors.full_messages.to_sentence}" } },
                 status: :unprocessable_entity
        end
      end
    end
  end
end
