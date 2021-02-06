class UsersController < ApplicationController # GET /users # before_action :set_user, only: %i[show update destroy]
  def toggle
    user = User.find(params[:id])
    user.admin!
    render json: user
  end

  # GET /users/1
  def show
    render json: current_user
  end

  # PATCH/PUT /users/1
  def update
    current_user.update(token: params[:token])
    render json: current_user
  end
end
