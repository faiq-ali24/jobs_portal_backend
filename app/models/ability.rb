# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?
    can :read, User, role: [
            User.roles[:candidate],
            User.roles[:company],
            User.roles[:company_manager],
            User.roles[:user_manager]]
    can :update, User, id: user.id
    
    if user.admin?
      can :manage, :all
      cannot :update, User
      cannot :read, id: user.id
      cannot :create, Job 
      cannot :create, Application  

      cannot :change_status, Application
      cannot :update, Job
      cannot :update, Application  
      cannot :destroy, User, id: user.id
    elsif user.company?
      can :read, Job, company_id: user.id
      can :create, Job, company_id: user.id
      can :update, Job, company_id: user.id 
      can :destroy, Job, company_id: user.id

      can :change_status, Application, job: { company_id: user.id}
      cannot :change_status, Application, status: [Application.statuses[:rejected], Application.statuses[:hired]]
      cannot :destroy, Application
      can :read, Application, job: { company_id: user.id }

    elsif user.company_manager?
      can :read, Job
      can :destroy, Job
      cannot :read, User, role: [
            User.roles[:candidate],
            User.roles[:user_manager],
            User.roles[:admin],
            User.roles[:company_manager]]
      can :destroy, User, role: User.roles[:company]
      can :read, User, id: user.id

      can :read, Application
    elsif user.user_manager?
      cannot :read, User, role: [
            User.roles[:company],
            User.roles[:user_manager],
            User.roles[:admin],
            User.roles[:company_manager]]
      can :destroy, User, role: User.roles[:candidate]

      can :read, User, id: user.id
      can :read, Application
      can :destroy, Application
      can :read, Job
    else
      can :read, Job
      can :update, User, id: user.id
      can :create, Application, user_id: user.id
      can :read, Application, user_id: user.id
      cannot [:update, :destroy], Application
    end
  end
end
