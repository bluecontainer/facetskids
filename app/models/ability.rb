class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    if user.has_role? :admin
      can :manage, :all
    else
      can :view, :alpha if user.has_role? :alpha
      can :view, :silver if user.has_role? :silver
    end
  end
end
