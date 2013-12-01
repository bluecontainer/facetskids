FacetsKids::Application.routes.draw do
  mount StripeEvent::Engine => '/stripe'

  authenticated :user do
    root :to => 'home#index', as: :authenticated_root
  end
  unauthenticated do
    root :to => "home#index", as: :unauthenticated_root
    #root :to => "invite_requests#new", as: :unauthenticated_root
  end
  devise_for :users, :controllers => { :registrations => 'registrations', :invitations => 'invitations', :sessions => 'sessions' }
  devise_scope :user do
    put 'update_plan', :to => 'registrations#update_plan'
    put 'update_card', :to => 'registrations#update_card'
    put 'add_invitations', :to => 'registrations#add_invitations'
  end
  resources :users

  resources :contacts, only: [:new, :create]
  resources :invite_requests, only: [:new, :create]

  get "flatuipro_demo/index"
  get "content/alpha"
  get "content/silver"
  get "content/about"
  get "content/faq"
  get "content/privacy"


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
    put 'videos/:id/tag', :to => 'videos#tag'
    post 'videos/:id/mark', :to => 'videos#create_save_mark'
    get 'videos/:id/mark', :to => 'videos#get_mark'
  end

end
