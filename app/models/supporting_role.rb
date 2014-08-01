class SupportingRole < ActiveRecord::Base
  belongs_to :video
  belongs_to :person
  belongs_to :supporting_role_type

  def name
    supporting_role_type.name
  end
end