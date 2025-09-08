class NumericSubdomain
  def self.matches?(request)
    sub = request.subdomain.to_s
    sub.present? && (sub =~ /\A\d+\z/ || sub == "admin")
  end
end