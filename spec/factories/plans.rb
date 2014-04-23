# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :plan do
    name "MyString"
    amount "0"
    interval nil
    trial_period_days 0
    stripe_plan_id nil
  end
end
