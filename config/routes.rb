D3::Application.routes.draw do
  resources :freebase, :only => [:index] do
    collection do
      post :search
    end
  end
end
