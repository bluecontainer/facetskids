
module StripeEventHandlers

  class UserEventHandler

    def call(event)
      user_event = create_user_event(event, event.data.object.customer, event.data.object.id)
      user_event.save unless user_event.nil?
    end

    private

    def create_user_event(event, customer_id, object_id)
      if !UserStripeEvent.exists?(event_id: event.id)
        user_event = UserStripeEvent.new
        user_event.event_id = event.id
        user_event.event_type = event.type
        user_event.event_object_id = object_id
        user_event.event_data = event.data.object.to_json
        user_event.user = User.find_by_customer_id(customer_id)
      end
      user_event
    end

  end

  class CustomerUserEventHandler < UserEventHandler
    def call(event)
      user_event = create_user_event(event, event.data.object.id, event.data.object.id)
      user_event.save unless user_event.nil?
    end
  end

  class CustomerDiscountUserEventHandler < UserEventHandler
    def call(event)
      user_event = create_user_event(event, event.data.object.customer, event.data.object.coupon.id)
      user_event.save unless user_event.nil?
    end
  end

  class ChargeUserEventHandler < UserEventHandler
    def call(event)
      save_user_charge_event(event)
    end
    
    private

    def save_user_charge_event(event)
      user_event = create_user_event(event, event.data.object.customer, event.data.object.id)
      unless user_event.nil?
        user_event.charge_amount = event.data.object.amount
        user_event.save
      end
      user_event
    end
  end

  class SubscriptionUserEventHandler < UserEventHandler
    def call(event)
      @user_event = create_user_event(event, event.data.object.customer, event.data.object.id)
      unless @user_event.nil?
        @user_event.save
        subscription = Subscription.find_by_stripe_subscription_id(event.data.object.id)
        unless subscription.nil?
          #unless subscription.cancel_at_period_end
            subscription.status = event.data.object.status
            subscription.current_period_start = Time.at(event.data.object.current_period_start)
            subscription.current_period_end = Time.at(event.data.object.current_period_end)
            subscription.trial_start = Time.at(event.data.object.trial_start) unless event.data.object.trial_start.nil?
            subscription.trial_end = Time.at(event.data.object.trial_end) unless event.data.object.trial_end.nil?
            subscription.canceled_at = Time.at(event.data.object.canceled_at) unless event.data.object.canceled_at.nil?
            subscription.ended_at = Time.at(event.data.object.ended_at) unless event.data.object.ended_at.nil?
            subscription.save
          #end
        end
      end
    end
  end

  class DeleteSubscriptionUserEventHandler < SubscriptionUserEventHandler
    def call(event)
      super
      if !@user_event.nil?
        @user_event.user.expire unless @user_event.user.nil?
      end
    end
  end

end
