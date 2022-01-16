class Api::V1::MusicsController < ApplicationController
  def index
    musics = Music.order(created_at: :desc)
    render json: musics
  end

  def show
    music = Music.find(params[:id])
    render json: music
  end

  def edit
  end

  def create
    music = Music.new(music_params)
    if music.save
      render json: music, status: 200
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
    params.require(:music).permit(:title, :body, :user_id)
  end

end
