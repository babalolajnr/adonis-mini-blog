import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async register({ request, response }) {
    const payload = await request.validate(RegisterUserValidator)
    let hashedPassword = await Hash.make(payload.password)

    // destructure password and other properties from the payload
    const { password, ...other } = payload

    // combine other user properties and hashed password
    const data = { ...other, ...{ password: hashedPassword } }

    const user = await (await User.create(data)).save()

    return response.json({
      success: 'Registration successful',
      user: user,
    })
  }

  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
