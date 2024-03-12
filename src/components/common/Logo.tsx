import { FC } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

import LogoSrc from "@/assets/loader.svg";

const Logo: FC = () => {
  return (
    <Link to="/">
      <Icon src={LogoSrc} />
    </Link>
  );
};

export default Logo;
