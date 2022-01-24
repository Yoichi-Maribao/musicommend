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
    music = Music.find(params[:id])
    if music.destroy
      head :no_content
    else
      render json: { error: "Failed to destroy"}, status: 422
    end

  end

  def update
    music = Music.find(params[:id])
    if music.update(music_params)
      render json: music, status: 200
    else
      render json: music.errors, status: 422
    end
  end

  private
  def music_params
    params.require(:music).permit(:title, :body, :user_id)
  end


end
