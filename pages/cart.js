import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
// import {getProductsCart} from '../api/cart';
import useCart from "../hooks/useCart";
import {getProductByUrlApi} from '../api/productos';
import Summarycart from "../components/Cart/SummaryCart/SummaryCart";

const Cart = () => {
  const { getProductCart } = useCart();

  const products = getProductCart();
  return !products ? <EmptyCart /> : <FullCart products={products} />;
};

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h1>Ningun prodcuto agregado al carrito</h1>
    </BasicLayout>
  );
}

function FullCart({ products }) {
  const [productsData, setProductsData] = useState(null);
  useEffect(() => {
      (async()=>{
          const productsTemp = [];
          for await (const product of products){
              const data = await getProductByUrlApi(product);
              productsTemp.push(data);
          }
         
          setProductsData(productsTemp);
      })()
  }, []);
  return (
    <BasicLayout className="full-cart">
      <Summarycart products ={productsData}/>
    </BasicLayout>
  );
}
export default Cart;
