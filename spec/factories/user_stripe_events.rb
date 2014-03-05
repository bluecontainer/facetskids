# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_stripe_event do
    event_id "MyString"
    event_type "MyString"
    event_data ""
    user nil
    charge_amount "9.99"
    charge_id "MyString"
    plan "MyString"
  end
end
