import { Product } from '../models';
import { IProduct } from '../../interfaces';
import { db } from '../database';

/**
 *
 * @param slug
 * @returns
 */
export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  try {
    await db.connect();

    const product = await Product.findOne({ slug }).lean();

    await db.disconnect();

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
    return null;
  }
};

type ProductSlug = {
  slug: string;
};
/**
 *
 * @returns
 */
export const getProductsWithSlug = async (): Promise<ProductSlug[]> => {
  try {
    await db.connect();

    const products = await Product.find().select('slug -_id').lean();

    await db.disconnect();

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 *
 * @param keyword
 * @returns
 */
export const searchProductsByKeyword = async (keyword: string): Promise<IProduct[]> => {
  try {
    keyword = keyword.toLowerCase();
    await db.connect();
    const products = await Product.find({
      $text: {
        $search: keyword,
      },
    })
      .select('title images price inStock slug -_id')
      .lean();

    await db.disconnect();

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 *
 * @returns
 */
export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    await db.connect();

    const products = await Product.find().lean();

    await db.disconnect();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
    return [];
  }
};
