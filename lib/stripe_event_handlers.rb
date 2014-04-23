
module StripeEventHandlers

  class UserEventHandler

    def call(event)
      create_user_event(event, event.data.object.customer).save
    end

    private

    def create_user_event(event, customer_id)
      user_event = UserStripeEvent.new
      user_event.event_id = event.id
      user_event.event_type = event.type
      user_event.event_data = event.data.object.to_json
      user_event.user = User.find_by_customer_id(customer_id)
      user_event
    end

  end

  class CustomerUserEventHandler < UserEventHandler
    def call(event)
      create_user_event(event, event.data.object.id).save
    end
  end

  class ChargeUserEventHandler < UserEventHandler

    def call(event)
      save_user_charge_event(event)
    end
    
    private

    def save_user_charge_event(event)
      user_event = create_user_event(event, event.data.object.customer)
      user_event.charge_amount = event.data.object.amount
      user_event.charge_id = event.data.object.id
      user_event.save
      user_event
    end
  end

  class SubscriptionUserEventHandler < UserEventHandler
    def call(event)
      @user_event = create_user_event(event, event.data.object.customer)
      @user_event.save
      subscription = Subscription.find_by_stripe_subscription_id(event.data.object.id)
      unless subscription.nil?
        #unless subscription.cancel_at_period_end
          subscription.status = event.data.object.status
          subscription.save
        #end
      end
    end
  end

  class DeleteSubscriptionUserEventHandler < SubscriptionUserEventHandler
    def call(event)
      super
      @user_event.user.expire unless @user_event.user.nil?
    end
  end

end
