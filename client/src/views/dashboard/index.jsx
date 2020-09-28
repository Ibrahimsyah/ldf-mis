import React, { useState, useEffect } from "react";
import { Row } from "antd";
import MenuCard from "../../components/MenuCard";
import { getMenu } from "../../routes/menu";

export default () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const menu = getMenu();
    setMenu(menu);
  }, []);
  return (
    <div className="fadeIn">
      <Row gutter={24}>
        {menu
          .filter((m) => !m.ignore)
          .map((m) => (
            <MenuCard
              key={m.name}
              title={m.name}
              subtitle={m.description}
              Icon={m.icon}
              path={m.path}
            />
          ))}
      </Row>
    </div>
  );
};
