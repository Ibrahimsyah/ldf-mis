import React from "react";
import { Row } from "antd";
import MenuCard from "../../components/MenuCard";
import menu from "../../routes/menu";

export default () => {
  return (
    <div className="fadeIn">
      <Row gutter={24}>
        {menu
          .filter((m) => !m.ignore)
          .map((m) => (
            <MenuCard
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
