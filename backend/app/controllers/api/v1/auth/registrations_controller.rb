class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    def sign_up_params
      # params.permit(:name, :email, :password, :password_confirmation)
      param = params.require(:registration).permit(:name, :email, :password, :password_confirmation)
    end

end
