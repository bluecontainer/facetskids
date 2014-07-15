Stripe.api_key = ENV["STRIPE_API_KEY"]
STRIPE_PUBLIC_KEY = ENV["STRIPE_PUBLIC_KEY"]

StripeEvent.configure do |events|

  events.subscribe 'customer.subscription.created' do |event|
    StripeEventHandlers::SubscriptionUserEventHandler.new.call(event)
    #new subscription email
  end

  events.subscribe 'customer.subscription.deleted' do |event|
    StripeEventHandlers::DeleteSubscriptionUserEventHandler.new.call(event)
    #user_event.user.expire unless user_event.user.nil?
  end

  events.subscribe 'customer.subscription.updated' do |event|
    StripeEventHandlers::SubscriptionUserEventHandler.new.call(event)
    #subscription changed email
  end

  events.subscribe 'charge.failed' do |event|
    StripeEventHandlers::ChargeUserEventHandler.new.call(event)
    #charge attempt failed
  end

  events.subscribe 'charge.succeeded' do |event|
    StripeEventHandlers::ChargeUserEventHandler.new.call(event)
    #customer card charged email
  end

  events.subscribe 'charge.refunded' do |event|
    StripeEventHandlers::ChargeUserEventHandler.new.call(event)
  end

  events.subscribe 'invoice.created' do |event|
    StripeEventHandlers::UserEventHandler.new.call(event)
  end
 
  events.subscribe 'invoice.updated' do |event|
    StripeEventHandlers::UserEventHandler.new.call(event)
  end

  events.subscribe 'invoice.payment_failed' do |event|
    StripeEventHandlers::UserEventHandler.new.call(event)
    #subscription payment attempts failed email
  end

  events.subscribe 'invoice.payment_succeeded' do |event|
    StripeEventHandlers::UserEventHandler.new.call(event)
  end

  events.subscribe 'customer.card.deleted' do |event|
    StripeEventHandlers::UserEventHandler.new.call(event)
  end

  events.subscribe 'customer.card.created' do |event|
    StripeEventHandlers::UserEventHandler.new.call(event)
  end

  events.subscribe 'customer.created' do |event|
    StripeEventHandlers::CustomerUserEventHandler.new.call(event)
  end

  events.subscribe 'customer.updated' do |event|
    StripeEventHandlers::CustomerUserEventHandler.new.call(event)
    #customer credit card information updated email
  end

  events.subscribe 'customer.discount.created' do |event|
    StripeEventHandlers::CustomerDiscountUserEventHandler.new.call(event)
    #coupon applied email
  end

  events.subscribe 'customer.subscription.trial_will_end' do |event|
    #trial ending in 3 days email
  end
end

