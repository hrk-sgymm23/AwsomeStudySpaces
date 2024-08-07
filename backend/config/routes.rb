Rails.application.routes.draw do
  # mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :health_check, only: :index
      resources :location_posts, only: [:index, :show, :create, :update, :destroy] do
        member do
          get 'get_users_posts'
        end
      end

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
