# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :donation do
    amount "9.99"
    user nil
    stripe_charge_id "MyString"
  end
end
