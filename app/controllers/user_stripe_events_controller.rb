class UserStripeEventsController < ApplicationController
  before_filter :authenticate_user!, only: [:index]

  def index
    @charges = current_user.user_stripe_events.charge.order("created_at asc")
  end

  protected
  def display_charge_type(event)
    case event.event_type
      when "charge.succeeded"
        "Charge"
      when "charge.failed"
        "Failed"
      when "charge.refunded"
        "Refund"
      else
      	"Unknown"
  	end
  end

  helper_method :display_charge_type
end
