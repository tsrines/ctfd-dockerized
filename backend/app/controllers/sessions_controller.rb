class SessionsController < ApplicationController
  def create
    graph = Koala::Facebook::API.new(params[:accessToken])
    profile = graph.get_object('me', fields: 'id, email, name, picture')
    user = User.find_by(uid: profile['id'])

    if user
      login_hash = User.handle_login(user)

      if login_hash
        render json: {
                 user_id: login_hash[:user_id],
                 name: login_hash[:name],
                 user: login_hash[:user]
               }
      else
        render json: { status: 'Log back into facebook', code: 422 }
      end
    else
      login_hash = User.handle_register(profile)
      if login_hash
        render json: {
                 user_id: login_hash[:user_id],
                 name: login_hash[:name],
                 user: login_hash[:user]
               }
      else
        render json: { status: 'Log back into facebook', code: 422 }
      end
    end
  end

  def not_found
    render json: { message: 'Sorry, that page no longer exists' }
  end
end
