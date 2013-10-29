class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:contact])
    @contact.received_at = Time.now.utc
    if @contact.valid?
      ContactMailer.new_contact(@contact).deliver
      redirect_to new_contact_path, :notice => "Your message was sent."
    else
      render :new
    end
  end
end
