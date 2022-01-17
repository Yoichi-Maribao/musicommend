Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :musics, except: %i[new]
      mount_devise_token_auth_for 'User', at: "auth", controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      resources :users, only: %i[index edit show update]
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
