class SessionsController < ApplicationController
  def new
    @user ||= User.new
  end
  
  def create
    @user = User.find_by_credentials(
    params[:user][:username],
    params[:user][:password]
    )
    
    if @user
      login!(@user)
      redirect_to root_url, notice: "Logged in!"
    else
      flash.now[:errors] = ["Invalid username or password."]
      @user = User.new
      render 'new'
    end
  end
  
  def destroy
    logout!
    redirect_to root_url, notice: "Logged out!"
  end
  
  def im_batman
    batman_counter = User.where("username LIKE 'Batman%'").length
    @batman = User.create!(username: "Batman#{batman_counter}", password: "password")
    login!(@batman)
    redirect_to root_url
  end
end
