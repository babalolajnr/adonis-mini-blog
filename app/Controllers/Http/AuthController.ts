import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  public async register({ request, response }) {
    const payload = await request.validate(RegisterUserValidator)

    const user = await (await User.create(payload)).save()

    return response.json({
      success: 'Registration successful',
      user: user,
    })
  }
}
