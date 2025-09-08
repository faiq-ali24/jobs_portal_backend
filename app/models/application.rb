class Application < ApplicationRecord
	belongs_to :user 
  belongs_to :job
  belongs_to :company, class_name: "User"

  has_one :document, as: :documentable, dependent: :destroy
  validates :document, presence: :true


  default_scope do
    # byebug
    if Current.company.present?
      where(company_id: Current.company.id)
    else
      all
    end
  end

  validate :company_matches_job

  enum status: {pending: 0, rejected: 1, hired: 2}

  def self.ransackable_attributes(auth_object = nil)
    ["status"]
  end

  private

  def company_matches_job
    if company_id.present? && job&.company_id.present? && company_id != job.company_id
      errors.add(:company_id, "does not match job company")
    end
  end

end
