class Job < ApplicationRecord
  belongs_to :company, class_name: "User"

  has_one :document, as: :documentable, dependent: :destroy

  default_scope do
    # byebug
    if Current.company.present?
      where(company_id: Current.company.id)
    else
      all
    end
  end

  validates :title, :description, :location, presence: true

  accepts_nested_attributes_for :document

  has_many :applications, dependent: :destroy

  def self.ransackable_attributes(auth_object = nil)
      ["title", "description", "salary", "location", "company_id", "created_at", "updated_at"]
  end 
  def self.ransackable_associations(auth_object = nil)
    ["applications", "company", "document"]
  end
end
