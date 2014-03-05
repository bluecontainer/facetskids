# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :gift_card do
    code "MyString"
    redeemed false
    value "9.99"
    sender nil
    receiver nil
    receiver_email "MyString"
    receiver_name "MyString"
  end
end
