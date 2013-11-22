# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_video_view, :class => 'UserVideoViews' do
    user nil
    video nil
    duration_seconds 1
    current_marker_seconds 1
  end
end
