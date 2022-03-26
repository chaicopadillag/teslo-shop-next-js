import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../../interfaces';

const productSchema = new Schema(
  {
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: 'El validador de enumeración falló para la ruta `{PATH}` con valor `{VALUE}`',
        },
      },
    ],
    slug: { type: String, required: true, unique: true, default: '' },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: { type: String, required: true, default: '' },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '`{VALUE}` no es un género permitido',
      },
      default: '',
    },
  },
  {
    timestamps: true,
  }
);
productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;
