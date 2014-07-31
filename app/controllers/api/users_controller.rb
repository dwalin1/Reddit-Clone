class Api::UsersController < ApplicationController
  def show
    @user = User.where(id: params[:id]).includes(:owned_subs).first
    @posts = @user.posts.limit(10)
    @comments = @user.comments.limit(10)
  end
end