class GiftCardMailer < ActionMailer::Base
  default :from => ENV["MAIL_FROM"]

  def purchase_email(gift_card)
    @gift_card = gift_card

    attachments["giftcard.pdf"] = WickedPdf.new.pdf_from_string(
      #render_to_string(:pdf => "invoice", :template => 'user_mailer/gift_card_email.html.erb')
      render_to_string(:pdf => "gift_card", :template => 'gift_cards/show.html.erb')
    )
    self.instance_variable_set(:@_lookup_context, nil)
    mail :to => [gift_card.receiver_email, gift_card.sender.email], :subject => "Your Facets Kids Gift Card", template_path: 'gift_cards', template_name: 'show'
  end
  
  def image_url(source)
    URI.join(unauthenticated_root_url, image_path(source))
  end
  helper_method :image_url
end