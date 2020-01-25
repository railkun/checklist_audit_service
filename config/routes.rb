Rails.application.routes.draw do

  root to: 'checklists#index'

  resources :checklists
  resources :audits
end
