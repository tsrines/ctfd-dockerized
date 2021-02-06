class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :set_service
  before_action :set_user

  attr_reader :service, :user

  def facebook
    handle_auth 'Facebook'
  end

  def twitter
    handle_auth 'Twitter'
  end

  def github
    handle_auth 'Github'
  end

  private

  def handle_auth(kind)
    if service.present?
      service.update(service_attrs)
    else
      user.services.create(service_attrs)
    end

    if user_signed_in?
      redirect_to edit_user_registration_path
    else
      sign_in_and_redirect user, event: :authentication
    end
  end

  def auth
    request.env['omniauth.auth']
  end

  def set_service
    @service = Service.where(provider: auth.provider, uid: auth.uid).first
  end

  def set_user
    if user_signed_in?
      @user = current_user
    elsif service.present?
      @user = service.user
    elsif User.where(email: auth.info.email).any?
      # 5. User is logged out and they login to a new account which doesn't match their old one
      flash[:alert] =
        "An account with this email already exists. Please sign in with that account before connecting your #{
          auth.provider.titleize
        } account."
      redirect_to new_user_session_path
    else
      @user = create_user
    end
  end

  def service_attrs
    expires_at =
      if auth.credentials.expires_at.present?
        Time.at(auth.credentials.expires_at)
      else
        nil
      end
    {
      provider: auth.provider,
      uid: auth.uid,
      expires_at: expires_at,
      access_token: auth.credentials.token,
      access_token_secret: auth.credentials.secret
    }
  end

  def create_user
    User.create(email: auth.info.email, password: Devise.friendly_token[0, 20])
  end
end