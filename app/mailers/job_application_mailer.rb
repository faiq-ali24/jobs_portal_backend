class JobApplicationMailer < ApplicationMailer

  default from: "noreply@jobportal.com"

  def created_email
    @application = params[:application]
    @job = @application.job 
    @user = @application.user  
    mail to: @user.email, subject: "Application Recieved for #{@job.title}"
  end

  

  def status_changed_email
    @application = params[:application]
    @job = @application.job 
    @user = @application.user 
    mail to: @user.email, subject: "Application Status Updated: #{@application.status}"
  end
end
