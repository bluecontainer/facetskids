# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    name 'Test User'
    email 'example@example.com'
    password 'changeme'
    password_confirmation 'changeme'
    age_acknowledgement true
    terms_acknowledgement true
    child_age 10
    # required if the Devise Confirmable module is used
    # confirmed_at Time.now
  end
end
