import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PromoBanner from './UI/PromoBanner.jsx';
import box from '../../public/assets/box.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError,
  selectSimilar,
  fetchAllProducts,
} from '../slices/product/productSlice.js';
import ProductCard from './ProductCard.jsx';

const singleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchAllProducts());

    return () => dispatch(resetStatusError());
  }, [dispatch, productId]);

  const singleProduct = useSelector(selectSingleProduct);
  const similarProducts = useSelector(selectSimilar);

  const handleDescriptionClick = (e) => {};

  return (
    <>
      <PromoBanner />
      <main className="font-serif flex h-[600px] ">
        <section className="flex gap-20 justify-center mt-16 ">
          <div className="">
            <img
              className="h-5/6"
              src={`/${singleProduct.imageURL}`}
              alt="error showing photo"
            />
          </div>
          <div className="w-1/3">
            <div className="flex justify-between">
              <header className=" text-green-900 text-3xl mb-8">
                {singleProduct.name}
              </header>
              <p className="text-2xl">❤️</p>
            </div>

            <div className="flex justify-between border-b-4 pb-2 mb-4">
              <p>
                {singleProduct?.tags?.map(({ tagName }) => tagName).join(', ')}
              </p>
            </div>
            <p className="text-primary-deep-green text-3xl font-bold mb-4">
              ${singleProduct.price}
            </p>
            <p className="mb-8 leading-tight">{singleProduct.description}</p>
            <div className="border-b-4 pb-4 mb-3">
              <button className="hover:bg-primary-button-green w-full bg-primary-deep-green text-white py-3 rounded-2xl mx-auto block text-xl hover:transition-all">
                ADD TO CART
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <img src={box} alt="shipping box icon" className="w-6" />
              <p className="text-sm">Free shipping in the USA</p>
            </div>
          </div>
        </section>
      </main>
      <section className="w-4/5 mx-auto mb-12">
        <h2 className="text-2xl">You might also like</h2>
        <div className="grid grid-cols-4 justify-items-center gap-x-8 gap-y-8 mx-12">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default singleProduct;
