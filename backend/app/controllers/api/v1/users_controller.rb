class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    image_path = Rails.application.routes.url_helpers.rails_representation_url(user.image.variant({}), only_path: true)
    render json: {user: user, image: image_path, musics: user.musics}
  end

  def edit
    user = User.find(params[:id])
    render json: user
  end

  def update
    user = User.find(params[:id])
    if user.valid?
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(decode(params[:user][:image][:data]) + "\n"),
        filename: params[:user][:image][:filename]
      )
      user.image.attach(blob)
      user.update(user_params)

      render json: {user: user}, status: 200
    else
      render status: 422, json: user.errors
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :introduction, :image)
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end

end
