import { useNavigate } from "react-router-dom";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Menu,
  Table,
  notification,
  InputNumber,
  Button,
  Form,
  Input,
  message,
  Checkbox,
} from "antd";
import Typography from "antd/es/typography/Typography";
import { useEffect, useState } from "react";
import { getCartItem } from "../../Api";

const items = [
  {
    label: <HomeFilled />,
    key: "",
  },
  {
    label: "Men",
    key: "men",
    children: [
      {
        label: "Shirts",
        key: "mens-shirts",
      },
      {
        label: "Shoe",
        key: "mens-shoes",
      },
      {
        label: "Watch",
        key: "mens-watches",
      },
    ],
  },
  {
    label: "Women",
    key: "Women",
    children: [
      {
        label: "Dresses",
        key: "womens-dresses",
      },
      {
        label: "Shoes",
        key: "womens-shoes",
      },
      {
        label: "Watch",
        key: "womens-watches",
      },
      {
        label: "Bags",
        key: "womens-bags",
      },
      {
        label: "Jwellery",
        key: "womens-jewellery",
      },
    ],
  },
  {
    label: "Fragrences",
    key: "fragrances",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="header">
      <Menu mode="horizontal" items={items} onClick={onMenuClick}></Menu>
      <Typography.Title>Style Mart</Typography.Title>
      <AppCart />
    </div>
  );
};

const AppCart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const onConfirmOrder = (values) => {
    message.success("Your Order is confirmed");
    setIsCheckout(false);
    setCartOpen(false);
  };
  useEffect(() => {
    const getCartProduct = async () => {
      try {
        const cartItem = await getCartItem();
        setCartProduct(cartItem?.products);
      } catch (error) {
        notification.open({
          message: "Error",
          description: error,
          duration: 3,
          placement: "topRight",
        });
      }
    };
    getCartProduct();
  }, []);
  return (
    <div>
      <Badge count={7} className="cart-icon" onClick={() => setCartOpen(true)}>
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>₹{value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    defaultValue={value}
                    min={0}
                    onChange={(value) => {
                      setCartProduct((prev) => {
                        return prev.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        });
                      });
                    }}
                  />
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>₹{value}</span>;
              },
            },
          ]}
          dataSource={cartProduct}
          summary={(data) => {
            const total = data.reduce(
              (sum, current) => sum + Number(current.total),
              0
            );
            return <span>Total Cart Value:{total}</span>;
          }}
        />
        <Button type="primary" onClick={() => setIsCheckout(true)}>
          Checkout Your Cart
        </Button>
        <Drawer
          open={isCheckout}
          onClose={() => setIsCheckout(false)}
          title="Confirm Order"
        >
          <Form onFinish={onConfirmOrder}>
            <Form.Item
              label="Full Name"
              name="full-name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Full Name",
                },
              ]}
            >
              <Input placeholder="Enter Your Full Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter A Vaild Email",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Enter Your Email" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Address",
                },
              ]}
            >
              <Input placeholder="Enter Your Address" />
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked disabled>
                Cash On Delivery
              </Checkbox>
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Confirm Order
            </Button>
          </Form>
        </Drawer>
      </Drawer>
    </div>
  );
};

export default Header;
