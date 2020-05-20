import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCT_QUERY } from "../store/query";
import { ShopContext } from "../store/context";
import ProductWrapper from "../components/ProductWrapper";
import Loading from "../components/Loading";

const Product = () => {
  const { handle } = useParams();
  const { addVariantToCart } = useContext(ShopContext);
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [itemQuantity, setItemQuantity] = useState(1);

  const { loading, error, data } = useQuery(GET_PRODUCT_QUERY, {
    variables: { handle },
    onCompleted: ({ productByHandle }) => {
      let newOptions = {};

      setSelectedImage(productByHandle.images.edges[0].node.originalSrc);
      setSelectedVariant(productByHandle.variants.edges[0].node);
      productByHandle.options[0] &&
        productByHandle.options.forEach((option) => {
          newOptions = { ...newOptions, [option.name]: option.values[0] };
          setSelectedOptions(newOptions);
        });
    },
  });

  const addToCart = () => addVariantToCart(selectedVariant.id, itemQuantity);

  const handleOptionChange = (event) => {
    const target = event.target;
    let newSelectedOptions = selectedOptions;
    newSelectedOptions[target.name] = target.value;

    console.log({ selectedVariant });

    const newSelectedVariant = data.productByHandle.variants.edges.find(
      (variant) => {
        return variant.node.selectedOptions.every((selectedOption) => {
          return (
            newSelectedOptions[selectedOption.name] ===
            selectedOption.value.valueOf()
          );
        });
      }
    );
    setSelectedImage(newSelectedVariant.node.image.originalSrc);
    setSelectedVariant(newSelectedVariant.node);
    // console.log(newSelectedVariant);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error {console.log(error)}</p>;

  const { variants } = selectedVariant || data.productByHandle;

  return (
    <div>
      <ProductWrapper
        product={data.productByHandle}
        price={
          selectedVariant
            ? selectedVariant.priceV2.amount
            : variants.edges[0].node.priceV2.amount
        }
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handleOptionChange={handleOptionChange}
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
        addToCart={addToCart}
      />
    </div>
  );
};

export default Product;
