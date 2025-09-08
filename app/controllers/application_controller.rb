class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include TenantScoped

  before_action :authenticate_user!
  before_action :permit_parameters, if: :devise_controller?
  before_action :check_tenant, unless: :devise_controller?
  rescue_from CanCan::AccessDenied do |e|
    render json: { error: e.message }, status: :forbidden
  end
    

  private

  def check_tenant
    # byebug
    if current_user.company? && (
        (Current.company != nil &&
           current_user.id != Current.company.id) )
        render json: { error: "Wrong subdomain" }, status: :unauthorized
     end
  end

  def permit_parameters
    sign_up_attrs = [:name, :location, :bio, :picture, :role]
    update_attrs  = [:name, :location, :bio, :picture, :password,
                     :password_confirmation, :current_password]

    devise_parameter_sanitizer.permit(:sign_up, keys: sign_up_attrs)
    devise_parameter_sanitizer.permit(:account_update, keys: update_attrs)
  end

end
