FacetsKids::Application.routes.draw do
  mount StripeEvent::Engine => '/stripe'

  authenticated :user do
    root :to => 'home#index', as: :authenticated_root
  end
  unauthenticated do
    #root :to => "home#index", as: :unauthenticated_root
    root :to => "invite_requests#new", as: :inviteonly_root
  end
  devise_for :users, :controllers => { :registrations => 'registrations', :invitations => 'invitations' }
  devise_scope :user do
    put 'update_plan', :to => 'registrations#update_plan'
    put 'update_card', :to => 'registrations#update_card'
  end
  resources :users

  resources :contacts, only: [:new, :create]
  resources :invite_requests, only: [:new, :create]

  get "flatuipro_demo/index"
  get "content/alpha"
  get "content/silver"
end
