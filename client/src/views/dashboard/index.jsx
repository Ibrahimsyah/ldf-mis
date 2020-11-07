import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { connect } from "react-redux";
import MenuCard from "../../components/MenuCard";
import { getMenu } from "../../routes/menu";

const App = (props) => {
  const {
    auth: { profile },
  } = props;
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const menu = getMenu(profile.role_name);
    setMenu(menu);
  }, [profile.role_name]);
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
