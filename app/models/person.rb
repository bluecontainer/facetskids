class Person < ActiveRecord::Base
  has_many :supporting_roles
  has_many :videos, through: :supporting_roles
end
