FacetsKids::Application.routes.draw do
  get "flatuipro_demo/index"
  mount StripeEvent::Engine => '/stripe'
  get "content/alpha"
  get "content/silver"
  authenticated :user do
    root :to => 'home#index', as: :authenticated_root
  end
  unauthenticated do
    root :to => "home#index", as: :unauthenticated_root
  end
  devise_for :users, :controllers => { :registrations => 'registrations', :invitations => 'invitations' }
  devise_scope :user do
    put 'update_plan', :to => 'registrations#update_plan'
    put 'update_card', :to => 'registrations#update_card'
  end
  resources :users
end
