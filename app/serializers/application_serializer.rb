class ApplicationSerializer
  include JSONAPI::Serializer
  attributes :user_id, :job_id, :age, :name, :yoe, :status, :email, :company_id

  attribute :resume do |application|
    if application.document&.file&.attached?
      Rails.application.routes.url_helpers.rails_blob_url(application.document.file, only_path: true)
    else
      nil 
    end
  end
end
