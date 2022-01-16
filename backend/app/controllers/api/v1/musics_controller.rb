class Api::V1::MusicsController < ApplicationController
  def index
    musics = Music.order(created_at: :desc)
    render json: musics
  end

  def show
  end

  def edit
  end

  def create
    music = Music.new(music_params)
    if music.save
      render json: music
    else
      render json: music.errors, status: 422
    end
  end

  def destroy
  end

  def update
  end

  private
  def music_params
    params.require(:music).permit(:title, :body).merge(user_id: current_api_v1_user.id)
  end

end
