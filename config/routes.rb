Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, only: [:create]
  resource :session
  
  namespace :api, defaults: { format: :json } do
    resources :subs do
      resources :posts, only: [:index]
    end
  
    resources :posts do
      resources :comments, only: [:index]
    end
  
    resources :comments, except: [:index]
    
    resources :votes, only: [:create, :destroy, :update]
    
    resources :users, only: [:show]
  end
  
  get "im_batman", to: "sessions#im_batman"
end
