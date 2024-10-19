import React from 'react';

const Tags = ({ product }) => {
  console.log('product',product);
  return (
    <>
      {product.tag.length !== 0 && (
        <div className="flex flex-row flex-wrap">
        <div className="mr-2 mb-2">
          {product?.tag.slice(0, Math.ceil(product.tag.length / 2)).map((t, i) => (
            <span
              key={i + 1}
              className="bg-gray-50 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
            >
              {t}
            </span>
          ))}
        </div>
        <div>
          {product?.tag.slice(Math.ceil(product.tag.length / 2)).map((t, i) => (
            <span
              key={i + Math.ceil(product.tag.length / 2)}
              className="bg-gray-50 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      
      )}
    </>
  );
};

export default Tags;
