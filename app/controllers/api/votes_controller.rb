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
    @vote = Vote.find(params[:id])
    @vote.destroy
    render json: {}
  end
  
  def update
  end
  
  private
  def vote_params
    params.require(:vote).permit(:voteable_id, :voteable_type, :vote_type)
  end
end