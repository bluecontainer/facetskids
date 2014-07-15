FacetsKids::Application.routes.draw do
  mount StripeEvent::Engine => '/stripe'

  authenticated :user do
    root :to => 'home#index', as: :authenticated_root
  end
  unauthenticated do
    root :to => "home#index", as: :unauthenticated_root
    #root :to => "invite_requests#new", as: :unauthenticated_root
  end

  get 'gift', :to => 'home#giftcard'

  devise_for :users, :controllers => { :registrations => 'registrations', :invitations => 'invitations', :sessions => 'sessions' }

  devise_scope :user do
    get 'myaccount', :to => 'registrations#edit'
    get 'redeem_gift', :to => 'registrations#redeem_gift'
    get 'purchase_gift', :to => 'registrations#purchase_gift_edit'
    put 'purchase_gift_update', :to => 'registrations#purchase_gift_update'
    put 'subscribe_plan', :to => 'registrations#subscribe_plan'
    put 'update_plan', :to => 'registrations#update_plan'
    put 'update_card', :to => 'registrations#update_card'
    put 'cancel_plan', :to => 'registrations#cancel_plan'
    put 'add_invitations', :to => 'registrations#add_invitations'
    put 'update_devices', :to => 'registrations#update_devices'
  end
  resources :users

  resources :contacts, only: [:new, :create]
  resources :invite_requests, only: [:new, :create]
  resources :user_stripe_events, only: [:index]
  resources :gift_cards, only: [:index, :show]

  get "flatuipro_demo/index"
  
  get "content/alpha"
  get "content/silver"
  get "content/giftcard"

  get "content/about"
  get "content/faq"
  get "content/privacy"
  get "content/device_confirmation"
  get "content/noipad"

  post '/videos/notifications', as: :notifications

  resources :videos, only: [:index, :show]

  namespace :account do
    resources :videos, only: [:index, :new, :edit, :create, :update, :destroy]
  end

  get 'app', :to => 'app#index'

  namespace :api do
    devise_for :users, only: []
    devise_scope :user do
      post   'sign_in'  => 'sessions#create'
      delete 'sign_out' => 'sessions#destroy'
    end
    get 'videos/counts', :to => 'videos#counts'
    resources :videos, only: [:index, :show, :create]
    get 'videos/:id/tags', :to => 'videos#get_tags'
    post 'videos/:id/tags', :to => 'videos#save_tags'
    post 'videos/mark', :to => 'videos#save_marker'
    get 'videos/:id/mark', :to => 'videos#get_marker'
  end

end
