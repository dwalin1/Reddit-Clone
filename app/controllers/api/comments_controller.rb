class Api::CommentsController < ApplicationController
  before_action :must_be_logged_in, except: [:index, :show]
  before_action :must_be_commenter, only: [:destroy, :update, :edit]
  
  def index
    @comments = Comment.where(post_id: params[:post_id])
    render json: @comments
  end
  
  def comment_index
    @comments = Comment.where(parent_comment_id: params[:parent_id])
    render json: @comments
  end
  
  def new
    post = Post.find(params[:post_id])
    @comment = post.comments.new
  end
  
  def create
    @comment = current_user.comments.new(comment_params)
    
    if @comment.save
      render "show"
    else
      render json: {msg: "Comment could not be created."}, status: 422
    end
  end
  
  def update
    @comment = current_user.comments.find(params[:id])
    
    if @comment.update_attributes(comment_params)
      render "show"
    else
      render json: {msg: "Comment could not be updated."}, status: 422
    end
  end
  
  def show
    @comment = Comment.find(params[:id])
  end
  
  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: {}
  end
  
  private
  def must_be_commenter
    comment = Comment.find(params[:id])
    unless current_user == comment.submitter
      render json: {msg: "You aren't the poster of this comment."}, status: 401
    end 
  end
  
  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_comment_id)
  end
end
