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
  end

  def destroy
  end

  def update
  end
end
