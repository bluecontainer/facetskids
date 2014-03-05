class GiftCard < ActiveRecord::Base
  belongs_to :sender, :class_name => "User"
  belongs_to :receiver, :class_name => "User"

  def initialize
    super
    self.code = create_code_string
    self.paid = false
    self.redeemed = false
    self.coupon_created = false
  end

  private
  def create_code_string
    code_string = String.new
    for i in 0..3
      code_string << create_code_digit
    end
    code_string << "-"
    for i in 0..3
      code_string << create_code_digit
    end
    code_string << "-"
    for i in 0..3
      code_string << create_code_digit
    end
 
    code_string
  end

  def create_code_digit
    rnd_num = rand(0..35)
    conversion_map = ('A'..'Z').to_a
    conversion_map += ('0'..'9').to_a
    conversion_map[rnd_num]
  end
end
