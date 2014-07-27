class Api::VotesController < ApplicationController
  before_action :must_be_logged_in
  
  def create    
    @vote = current_user.votes.new(vote_params)
        
    if @vote.save
      render json: @vote
    else
      render json: {msg: "Vote could not be created."}, status: 422
    end
  end
  
  def destroy
    @vote = current_user.votes.find(params[:id])
    @vote.destroy
    render json: {}
  end
  
  def update    
    @vote = current_user.votes.find(vote_params[:id])  

    if @vote.update_attributes(vote_type: vote_params[:vote_type])
      render json: @vote
    else
      render json: {msg: "Vote could not be updated."}, status: 422
    end
  end
  
  private
  def vote_params
    params.require(:vote).permit(:voteable_id, :voteable_type, :vote_type, :id)
  end
end