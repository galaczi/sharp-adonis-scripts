import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import sharp from 'sharp'


export default class EditsController {
  public async upload({request, response}: HttpContextContract) {
    const schema = await Schema.create({
      featuredImage: Schema.file({ size: '2mb', extnames: ['jpg', 'gif', 'png'] }),
    })

    const {featuredImage} = await request.validate({schema})
    
    const sizes = [[400, 400], [600, 600], [800, 800], [1200, 1200], [1600, 1600]]

    await Promise.all(sizes.map(size => sharp(featuredImage!.tmpPath)
      .resize(...size)
      .toFile('public/uploads/' + 'test' + size[0] + 'x' + size[1] + '.webp')))

    console.log('resized and saved')
    response.redirect().toRoute('home')
  }
}