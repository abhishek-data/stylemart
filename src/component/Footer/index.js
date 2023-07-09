import Typography from "antd/es/typography/Typography";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <Typography.Link href="https//www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https//www.google.com" target={"_blank"}>
        Terms & conditions
      </Typography.Link>
      <Typography.Link href="https//www.google.com" target={"_blank"}>
        Return Policy
      </Typography.Link>
      <Typography.Link href="tel:+918800880088" target={"_blank"}>
        +918800880088
      </Typography.Link>
    </div>
  );
};

export default Footer;
