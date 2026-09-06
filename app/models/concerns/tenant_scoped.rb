module TenantScoped
  extend ActiveSupport::Concern

  included do
    around_action :with_request_tenant
  end

  private

  def with_request_tenant
    sub = request.subdomain.to_s

    if sub.match?(/\A\d+\z/)
      tenant = User.find_by(id: sub.to_i, role: :company)
      return render json: { error: "Company not found" }, status: :not_found unless tenant

      ActsAsTenant.with_tenant(tenant) { yield }
    else
      ActsAsTenant.without_tenant { yield }
    end
  end
end
