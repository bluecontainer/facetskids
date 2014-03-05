Stripe.api_key = ENV["STRIPE_API_KEY"]
STRIPE_PUBLIC_KEY = ENV["STRIPE_PUBLIC_KEY"]

StripeEvent.setup do
  subscribe 'customer.subscription.deleted' do |event|
    user = User.find_by_customer_id(event.data.object.customer)
    user.expire unless user.nil?
  end

  subscribe 'charge.failed' do |event|
    save_user_charge_event(event)
  end

  subscribe 'charge.succeeded' do |event|
    save_user_charge_event(event)
  end
 
  #invoice.updated
  #invoice.payment_failed
  subscribe 'invoice.payment_succeeded' do |event|
    user_event = create_user_event(event, event.data.object.customer)
    user_event.save
  end

  subscribe 'customer.card.deleted' do |event|
    user_event = create_user_event(event, event.data.object.customer)
    user_event.save
  end

  subscribe 'customer.card.created' do |event|
    user_event = create_user_event(event, event.data.object.customer)
    user_event.save
  end

  subscribe 'customer.updated' do |event|
    user_event = create_user_event(event, event.data.object.id)
    user_event.save
  end

  #customer.subscription.updated
end

def create_user_event(event, customer_id)
  user_event = UserStripeEvent.new
  user_event.event_id = event.id
  user_event.event_type = event.type
  user_event.event_data = event.data.object.to_json
  user_event.user = User.find_by_customer_id(customer_id)
  user_event
end

def save_user_charge_event(event)
  user_event = create_user_event(event, event.data.object.customer)
  user_event.charge_amount = event.data.object.amount
  user_event.charge_id = event.data.object.id
  user_event.save
  user_event
end
