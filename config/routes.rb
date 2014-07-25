Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users
  resource :session
  
  namespace :api, defaults: { format: :json } do
    resources :subs do
      resources :posts, only: [:index]
    end
  
    resources :posts, except: [:index] do
      resources :comments, only: [:index]
    end
  
    resources :comments, except: [:index]
    
    get "nested_comments/:parent_id/", to: "comments#comment_index"
  end
end
