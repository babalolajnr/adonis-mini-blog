import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)
    const post = await (await auth.user?.related('post').create(payload)).save()
    return response.json({
      status: response.created,
      post: post,
    })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
