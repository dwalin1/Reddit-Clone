class Api::PostsController < ApplicationController
  before_action :must_be_poster, only: [:edit, :update, :destroy]
  
  def index
  end
  
  def new
    sub = Sub.find(params[:sub_id])
    @post ||= sub.posts.new
  end
  
  def edit
    @post = Post.find(params[:id])
  end
  
  def create
    @post = current_user.posts.new(post_params)
    @post.sub_id = params[:sub_id]
    
    if @post.save
      redirect_to sub_url(@post.sub), notice: "Post created!"
    else
      flash.now[:errors] = @post.errors.full_messages
      @post = Post.new
      render 'new'
    end
  end
  
  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      redirect_to sub_url(@post.sub), notice: "Post updated!"
    else
      flash.now[:errors] = @post.errors.full_messages
      render 'edit'
    end
  end
  
  def destroy
    @post = Post.find(params[:id])
    sub = @post.sub
    @post.destroy
    redirect_to sub_url(sub), notice: "Post destroyed!"
  end
  
  def show
    @post = Post.find(params[:id])
    render json: @post
  end
  
  private
  def must_be_poster
    post = Post.find(params[:id])
    unless current_user == post.submitter
      redirect_to sub_url(post.sub), errors: "You aren't the submitter of that post."
    end 
  end
  
  def post_params
    params.require(:post).permit(:title, :url, :content)
  end
end
