import Joi from 'joi'

const ProductModel = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  thumbnail: Joi.string().required(),
})

export default ProductModel
