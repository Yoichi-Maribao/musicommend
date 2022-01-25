# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :musics
  has_one_attached :image

  def image_path
    return self.image.attached? ? Rails.application.routes.url_helpers.rails_representation_url(self.image.variant({}), only_path: true) : ""
  end
end
