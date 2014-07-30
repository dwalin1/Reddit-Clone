class Api::SubsController < ApplicationController
  before_action :must_be_logged_in, except: [:index, :show]
  before_action :must_be_moderator, only: [:edit, :update, :destroy]
  
  def index
    @subs = Sub.all
  end
  
  def show
    @page = params[:page]
    @sub = Sub.includes(:moderator).find(params[:id])
    @sub_posts = @sub.posts.includes(:submitter, :votes).page(@page).per(2)
    @total_pages = @sub_posts.total_pages
  end
  
  def new
    @sub ||= Sub.new
  end
  
  def edit
    @sub = Sub.find(params[:id])
  end
  
  def create
    @sub = current_user.owned_subs.new(sub_params)
    if @sub.save
      render json: @sub
    else
      render json: {msg: @sub.errors.full_messages}, status: 422
    end
  end
  
  def update
    @sub = Sub.find(params[:id])
    if @sub.update_attributes(sub_params)
      render json: @sub
    else
      render json: {msg: @sub.errors.full_messages}, status: 422
    end
  end
  
  def destroy
    @sub = Sub.find(params[:id])
    @sub.destroy
    render json: {}
  end
  
  private
  def must_be_moderator
    sub = Sub.find(params[:id])
    unless current_user == sub.moderator
      render json: {msg: "You aren't the moderator of this sub."}, status: 401
    end 
  end
  
  def sub_params
    params.require(:sub).permit(:title, :description)
  end
end
