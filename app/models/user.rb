class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, 
         jwt_revocation_strategy: self




  enum role: {candidate: 0, admin: 1, company: 2, company_manager: 3,
              user_manager: 4}

  has_one_attached :picture

  validate :validate_picture
  
  has_many :jobs, foreign_key: :company_id, dependent: :destroy

  has_many :applications, dependent: :destroy



  private

  def validate_picture
    
    formats = ["image/jpeg", "image/png"]
    if picture.attached? == true &&  formats.include?(picture.blob.content_type) == false
      errors.add(:picture, "Wrong Format.")
    end
  end

end
