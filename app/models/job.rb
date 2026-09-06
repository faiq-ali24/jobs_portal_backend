class Job < ApplicationRecord
  include PgSearch::Model

  acts_as_tenant :company, class_name: "User"

  pg_search_scope :ranked_search,
                  against: {
                    title: 'A',
                    description: 'B',
                    location: 'C'
                  },
                  using: {
                    tsearch: {
                      dictionary: 'english',
                      prefix: true,
                      normalization: 2
                    },
                    trigram: {
                      threshold: 0.2,
                      only: %i[title location]
                    }
                  },
                  ranked_by: ':tsearch + (0.25 * :trigram)',
                  order_within_rank: 'jobs.created_at DESC'

  has_one :document, as: :documentable, dependent: :destroy

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
