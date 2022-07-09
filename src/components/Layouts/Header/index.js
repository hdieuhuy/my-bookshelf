import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Icon } from "@iconify/react";

import BackgroundHeader from "src/assets/img/background-header.jpg";

const Header = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackToMain = () => navigate("/");

  const renderTitle = !id ? (
    <div>my bookshelf</div>
  ) : (
    <div>
      <Icon icon="ic:round-keyboard-return" onClick={handleBackToMain} />

      <span>book details</span>
    </div>
  );

  return (
    <div
      className="header"
      style={{
        background: `url(${BackgroundHeader})`,
        backgroundSize: "cover",
      }}
    >
      <div className="header__title">{renderTitle}</div>
    </div>
  );
};

export default Header;
