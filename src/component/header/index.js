import { useNavigate } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    label: <HomeFilled />,
    key: "",
  },
  {
    label: "Men",
    key: "Men",
    children: [
      {
        label: "Shirts",
        key: "men-shirts",
      },
      {
        label: "Shoe",
        key: "men-shoe",
      },
      {
        label: "Watch",
        key: "men-watch",
      },
    ],
  },
  {
    label: "Women",
    key: "Women",
    children: [
      {
        label: "Dresses",
        key: "women-Dresses",
      },
      {
        label: "Shoes",
        key: "women-Shoes",
      },
      {
        label: "Watch",
        key: "women-Watch",
      },
      {
        label: "Bags",
        key: "women-Bags",
      },
      {
        label: "Jwellery",
        key: "women-Jwellery",
      },
    ],
  },
  {
    label: "Fragrences",
    key: "Fragrences",
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
    </div>
  );
};

export default Header;
