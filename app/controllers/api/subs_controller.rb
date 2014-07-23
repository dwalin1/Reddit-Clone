class Api::SubsController < ApplicationController
  before_action :must_be_moderator, only: [:edit, :update, :destroy]
  
  def index
    @subs = Sub.all
  end
  
  def show
    @sub = Sub.includes(posts: [:submitter], moderator: [:username, :id]).find(params[:id])
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
      redirect_to sub_url(@sub), notice: "Sub created!"
    else
      flash.now[:errors] = @sub.errors.full_messages
      @sub = Sub.new
      render 'new'
    end
  end
  
  def update
    @sub = Sub.find(params[:id])
    if @sub.update_attributes(sub_params)
      redirect_to sub_url(@sub), notice: "Sub updated!"
    else
      flash.now[:errors] = @sub.errors.full_messages
      render 'edit'
    end
  end
  
  def destroy
    @sub = Sub.find(params[:id])
    @sub.destroy
    redirect_to subs_url, notice: "Sub destroyed!"
  end
  
  private
  def must_be_moderator
    sub = Sub.find(params[:id])
    unless current_user == sub.moderator
      redirect_to subs_url, errors: "You aren't the moderator of that sub."
    end 
  end
  
  def sub_params
    params.require(:sub).permit(:title, :description)
  end
end
