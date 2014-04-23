# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :subscription do
    user nil
    plan nil
    status "MyString"
    cancel_at_period_end false
    canceled_at "2014-03-27 03:14:20"
    trial_start "2014-03-27 03:14:20"
    trial_end "2014-03-27 03:14:20"
    current_period_start "2014-03-27 03:14:20"
    current_period_end "2014-03-27 03:14:20"
    stripe_subscription_id "MyString"
  end
end
