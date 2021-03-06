# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Environment variables (ENV['...']) are set in the file config/application.yml.
# See http://railsapps.github.io/rails-environment-variables.html
puts 'ROLES'
YAML.load(ENV['ROLES']).each do |role|
  Role.find_or_create_by_name( role )
  puts 'role: ' << role
end

puts 'MAIL LISTS'
mail_list = MailList.find_or_create_by_name( :name => "product_updates", :description => "Receive updates when features and content are added" )
puts 'mail list: ' << mail_list.name
mail_list = MailList.find_or_create_by_name( :name => "research_invitations", :description => "Receive invitations to provide feedback through surveys and workshops" )
puts 'mail list: ' << mail_list.name

puts 'DEFAULT USERS'
user = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :email => ENV['ADMIN_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup, :age_acknowledgement => true, :terms_acknowledgement => true
user.add_role :admin
puts 'user: ' << user.name

user = User.find_or_create_by_email :name => 'Ben Spark', :email => 'ben@toca.com', :password => 'password', :password_confirmation => 'password', :child_age => 9, :age_acknowledgement => true, :terms_acknowledgement => true
user.add_role :alpha
user.add_mail_list :product_updates
puts "user: #{user.name}"

