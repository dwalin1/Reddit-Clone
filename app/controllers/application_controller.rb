class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  
  def current_user
    return nil unless session[:token]
    @current_user ||= User.find_by_session_token(session[:token])
  end
  
  def login!(user)
    @current_user = user
    session[:token] = user.set_session_token!
  end
  
  def logout!
    current_user.set_session_token!
    @current_user = nil
    session[:token] = nil
  end
  
  def must_be_logged_in
    unless current_user
      redirect_to new_session_url, error: "You must be logged in for that."
    end
  end
end
