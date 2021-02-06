class ApplicationController < ActionController::API
  def authenticate
    if request.headers['Authorization']
      storage_token = request.headers['Authorization'].split(' ')[1]
    end

    decoded_token = CoreModules::JsonWebToken.decode(storage_token)
    user = User.find_by(id: decoded_token['user_id']) if decoded_token
    if user
      return true
    else
      render json: { status: 'unauthorized', code: 401 }
    end
  end

  def current_user
    if request.headers['Authorization']
      storage_token = request.headers['Authorization'].split(' ')[1]
    end
    decoded_token = CoreModules::JsonWebToken.decode(storage_token)
    user = User.find_by(id: decoded_token['user_id']) if decoded_token
    if user
      return user
    else
      return false
    end
  end
end
