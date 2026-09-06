class JobSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :salary, :location, :company_id,
             :required_skills, :preferred_skills, :minimum_experience_years

  attribute :brochure do |job|
    if job.document&.file&.attached?
      Rails.application.routes.url_helpers.rails_blob_url(job.document.file, only_path: true)
    else
      nil
    end
  end
end
