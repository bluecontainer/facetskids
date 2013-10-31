class MailList < ActiveRecord::Base
  has_and_belongs_to_many :users, :join_table => :users_mail_lists

  attr_accessible :name, :description  
end
