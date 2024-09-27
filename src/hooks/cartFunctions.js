"use client";

export const addProductToCart = (productItem) => {
  if (typeof window !== "undefined") {
    const products = localStorage.getItem("products");
    const allProdcuts = products ? JSON.parse(products) : [];
    const existingProduct = allProdcuts.find(
      (product) => product._id === productItem._id
    );

    if (existingProduct) {
      const restProduct = allProdcuts.filter(
        (product) => product._id !== productItem._id
      );

      const newProduct = {
        ...existingProduct,
        price: existingProduct.price,
        quantity: existingProduct.quantity + 1,
        totalPrice: existingProduct.price * (existingProduct.quantity + 1),
      };

      const newSetProduct = [...restProduct, newProduct];

      localStorage.setItem("products", JSON.stringify(newSetProduct));
      return;
    }
    const newProduct = {
      _id: productItem._id,
      price: productItem.product_price,
      quantity: 1,
      totalPrice: productItem.product_price,
      image: productItem.product_images,
      name: productItem.product_title,
    };
    const newSetProduct = [...allProdcuts, newProduct];
    localStorage.setItem("products", JSON.stringify(newSetProduct));
    return;
  }
};
