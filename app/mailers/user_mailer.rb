class UserMailer < ApplicationMailer

  default from: "noreply@jobportal.com"

  def welcome_email
    @user = params[:user]
    mail to: @user.email, subject: "Welcome to Job Portal"
  end
end
