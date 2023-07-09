import { useEffect, useState } from "react";
import { getAllPrducts, getProductsByCategory, addToCartHandler } from "../../Api";
import {
  List,
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin
} from "antd";
import { useParams } from "react-router-dom";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const params = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const products = await (params?.categoryId ? getProductsByCategory(params.categoryId): getAllPrducts());
        setItems(products["products"]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [params]);
  if(loading) {
    return <Spin spinning/>
  }
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="product-ribbon"
              text={`${product.discountPercentage}%off`}
              color="red"
            >
              <Card
                className="product-card"
                title={product.title}
                key={product.id}
                cover={
                  <Image className="item-card-image" src={product.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      ₹
                      <Typography.Text>
                        {(
                          product.price -
                          (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>{" "}
                      <Typography.Text delete type="danger">
                        ₹{product.price}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
};

const AddToCartButton = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const addToCartHandle = async () => {
    setLoading(true);
    const res = await addToCartHandler(item.id);
    if (res) {
      message.success(`${item.title} has been added to the cart`);
    }
    setLoading(false);
  };
  return (
    <Button type="link" onClick={addToCartHandle} loading={loading}>
      Add To Cart
    </Button>
  );
};
export default Products;
