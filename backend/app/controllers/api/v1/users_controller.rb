class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    musics = user.musics
    render json: {user: user, musics: musics}
  end

  def edit
    user = User.find(params[:id])
    render json: user
  end

  def update

  end

  private
  def user_params
    params.require(:user).permit(:name, :introduction, :image)
  end


end
