class UsersController < ApplicationController
  before_action :must_be_logged_in, except: [:new, :create]
  before_action :must_be_same_user, only: [:update, :edit]
  
  def new
    @user ||= User.new
  end
  
  def edit
    @user = current_user
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to subs_url, notice: "User created!"
    else
      flash.now[:errors] = @user.errors.full_messages
      render 'new'
    end
  end
  
  def update
    @user = current_user
    if @user.update_attributes(user_params)
      redirect_to user_url(@user), notice: "User updated!"
    else
      flash.now[:errors] = @user.errors.full_messages
      render 'edit'
    end
  end
  
  def show
    @user = User.find(params[:id])
  end
  
  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
  
  def must_be_same_user
    unless current_user.id == params[:id]
      flash.now[:errors] = "You can't update another user, silly!"
      render 'edit'
    end
  end
end
