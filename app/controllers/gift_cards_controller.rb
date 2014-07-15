class GiftCardsController < ApplicationController
  before_filter :authenticate_user!, only: [:index]

  def index
    @sent_gift_cards = current_user.sent_gift_cards
  end

  def show
    @gift_card = GiftCard.find(params[:id])
    
    respond_to do |format|
      format.html
      format.pdf do
        render :pdf => "gift_card", :template => 'gift_cards/show.html.erb'
      end
    end
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
