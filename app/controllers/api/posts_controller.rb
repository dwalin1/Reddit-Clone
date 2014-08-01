class Api::PostsController < ApplicationController
  before_action :must_be_logged_in, except: [:index, :show]
  before_action :must_be_poster, only: [:edit, :update, :destroy]
  
  def index
    pages_per = 10
    @page = params[:page]
    
    if params[:sub_id]
      @posts = Post.where(sub_id: params[:sub_id])
      .includes(:sub, :submitter, :votes)
      .order(upvotes: :desc)
      .page(@page).per(pages_per)
    else
      @posts = Post.includes(:sub, :submitter, :votes).order(upvotes: :desc)
      .page(@page).per(pages_per)
    end
    
    @total_pages = @posts.total_pages
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
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end
  
  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end
  
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: {}
  end
  
  def show
    @post = Post.includes(:submitter).find(params[:id])
    @top_level_comments = @post.comments.where(parent_comment_id: nil).includes(:submitter, :votes)
    @comments = @post.comments.where.not(parent_comment_id: nil).includes(:submitter, :votes)
  end
  
  private
  def must_be_poster
    post = Post.find(params[:id])
    unless current_user == post.submitter
      render json: {msg: "You aren't the poster of this post."}, status: 401
    end 
  end
  
  def post_params
    params.require(:post).permit(:title, :url, :content, :upvotes)
  end
end
