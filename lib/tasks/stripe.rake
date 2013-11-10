
namespace :stripe do

  desc 'verify your stripe.com authentication configuration'
  task 'verify' => :environment do
    begin
      Stripe::Plan.all
      puts "[OK] - connection to stripe.com is functioning properly"
    rescue Stripe::AuthenticationError => e
      puts "[FAIL] - authentication failed"
    end
  end

  task 'customers:delete' => 'environment' do
    
    customers = Stripe::Customer.all
    while customers.any?
      customers.each { |customer|
        output = customer[:id] + ", " + customer[:email]
        puts output
        customer.delete
      }
      customers = Stripe::Customer.all
    end
  end

  #desc "create all plans and coupons defined in config/stripe/{plans|coupons}.rb"
  #task 'prepare' => ['plans:prepare', 'coupons:prepare']
end
