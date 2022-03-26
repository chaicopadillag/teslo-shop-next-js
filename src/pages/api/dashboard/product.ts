import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../app/database';
import { Product } from '../../../app/models';
import { IProduct } from '../../../interfaces';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function handlerProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res);

    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'DELETE':
      // return deleteProduct(req, res)
      break;

    default:
      return res.status(405).json({
        message: 'Method not allowed',
      });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
const getAllProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const products = await Product.find().sort({ createdAt: -1 }).lean();

    await db.disconnect();

    return res.status(200).json(
      products.map((product) => ({
        ...product,
        images: product.images.map((image) => (image.includes('https://') ? image : `${process.env.APP_URL}/products/${image}`)),
      }))
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { _id = '', images = [] } = req.body as IProduct;

    if (!isValidObjectId(_id)) {
      return res.status(422).json({
        message: 'Invalid product id',
      });
    }

    if (images.length < 2) {
      return res.status(422).json({
        message: 'You must provide at least 2 images',
      });
    }

    await db.connect();

    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // TODO: eliminar fotos en Cloudinary
    // https://res.cloudinary.com/cursos-udemy/image/upload/v1645914028/nct31gbly4kde6cncc6i.jpg

    for (const image of product.images) {
      if (!images.includes(image)) {
        // Borrar de cloudinary
        const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.');
        console.log({ image, fileId, extension });
        await cloudinary.uploader.destroy(fileId);
      }
    }

    await product.update({
      ...req.body,
      images: images.map((image) => (image.includes(`${process.env.APP_URL}/products/`) ? image.replace(`${process.env.APP_URL}/products/`, '') : image)),
    });

    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { images = [], ...rest } = req.body as IProduct;

    if (images.length < 2) {
      return res.status(422).json({
        message: 'You must provide at least 2 images',
      });
    }

    await db.connect();

    const product = await Product.create(rest);

    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
