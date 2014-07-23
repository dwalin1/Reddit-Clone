Rails.application.routes.draw do
  resources :users
  resource :session
  resources :subs do
    resources :posts, except: [:destroy, :update, :edit, :show]
  end
  
  resources :posts, only: [:destroy, :update, :edit, :show] do
    resources :comments, only: [:new]
  end
  
  resources :comments, except: [:new, :index]
end
