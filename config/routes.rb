Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  namespace :api do 
    namespace :v1 do
      get '/applications/get_all', to: "applications#get_all" 
      get '/me', to: "users#me"
      get '/users/get_companies', to: "users#get_companies"
    end
  end
  constraints NumericSubdomain do
    namespace :api do 
      namespace :v1 do
        get '/users/get_all', to: "users#get_all"
        get '/me', to: "users#me"
        get '/show/:id', to: "users#show"
        get '/applications/get_all', to: "applications#get_all"
        delete '/applications/:id', to: 'applications#destroy'
        delete '/users/:id', to: "users#destroy"
        resources :jobs do
          resources :applications, only: [:create, :index, :show] do
            member do
              patch :change_status
            end
          end
        end
      end
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
