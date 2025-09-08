# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  include RackSessionsFix
  include TenantScoped
  
  def update
    authorize! :update, current_user

    wants_password = user_params[:password].present?

    if wants_password
      if current_user.update_with_password(user_params)
        current_user.update!(jti: SecureRandom.uuid)
        sign_in(resource_name, current_user)
        render json: {
          status: { code: 200, message: 'Updated successfully.' },
          data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }
      else
        render json: {
          status: { message: "User couldn't be updated successfully. #{current_user.errors.full_messages.to_sentence}" }
        }, status: :unprocessable_entity
      end
    else
      profile_params = user_params.except(:current_password, :password, :password_confirmation)

      if current_user.update_without_password(profile_params)
        render json: {
          status: { code: 200, message: 'Updated successfully.' },
          data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }
      else
        render json: {
          status: { message: "User couldn't be updated successfully. #{current_user.errors.full_messages.to_sentence}" }
        }, status: :unprocessable_entity
      end
    end
  end

  



  private

  def respond_with(current_user, _opts = {})
    if resource.persisted?
      UserMailer.with(user: resource).welcome_email.deliver_later
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end

  def user_params
    params.require(:user).permit(:name, :bio, :location, :picture,
      :password, :password_confirmation, :current_password)
  end

end
