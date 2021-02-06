class AuthenticateUser
  prepend SimpleCommand

  def initialize(email, uid)
    @email = email
    @uid = uid
  end

  def call
    JsonWebToken.encode(user_id: uid) if user
  end

  private

  attr_accessor :email, :uid

  def user
    user = User.find_by(id: @id, uid: @uid)

    return user if user

    errors.add :user_authentication, 'Invalid credentials'
    nil
  end
end
