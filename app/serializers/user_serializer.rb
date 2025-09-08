class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :name, :role, :location, :bio
  def picture_url(user)
    if user.picture.attached?
      Rails.application.routes.url_helpers.rails_blob_url(user.picture, only_path: true)
    else
      nil 
    end
  end

  attribute :picture do |user|
    if user.picture.attached?
      Rails.application.routes.url_helpers.rails_blob_url(user.picture, only_path: true)
    else
      nil 
    end
  end
end
