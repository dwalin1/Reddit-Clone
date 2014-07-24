class Api::CommentsController < ApplicationController
  before_action :must_be_commenter, only: [:destroy, :update, :edit]
  
  def new
    post = Post.find(params[:post_id])
    @comment = post.comments.new
  end
  
  def create
    @comment = current_user.comments.new(
    content: params[:comment][:content],
    post_id: params[:comment][:post_id]
    )
    
    if @comment.save
      redirect_to post_url(@comment.post), notice: "Comment created!"
    else
      flash.now[:errors] = @comment.errors.full_messages
      redirect_to post_url(params[:post_id])
    end
  end
  
  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end
  
  def destroy
    comment = Comment.find(params[:id])
    post = comment.post
    comment.destroy
    redirect_to post_url(post), notice: "Comment deleted!"
  end
  
  private
  def must_be_commenter
    comment = Comment.find(params[:id])
    unless current_user == comment.submitter
      redirect_to post_url(comment.post), errors: "You aren't the submitter of that post."
    end 
  end
end
