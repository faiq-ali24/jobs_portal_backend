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
    if request.subdomain.to_s == "admin" && !management_user?
      return render json: { error: "Forbidden" }, status: :forbidden
    end

    tenant = ActsAsTenant.current_tenant
    return unless current_user.company? && tenant.present? && current_user.id != tenant.id

    render json: { error: "Wrong subdomain" }, status: :unauthorized
  end

  def management_user?
    current_user.admin? || current_user.company_manager? || current_user.user_manager?
  end

  def permit_parameters
    sign_up_attrs = [:name, :location, :bio, :picture, :role]
    update_attrs  = [:name, :location, :bio, :picture, :password,
                     :password_confirmation, :current_password]

    devise_parameter_sanitizer.permit(:sign_up, keys: sign_up_attrs)
    devise_parameter_sanitizer.permit(:account_update, keys: update_attrs)
  end

end
