import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import styles from "./style.less";

export default ({ list = [], style = {} }) => {
  return (
    <div className={styles.breadcrumb}>
      <Breadcrumb separator="|" style={{ ...style }}>
        {list.map(item => (
          <Breadcrumb.Item key={item.name}>
            {item.href ? (
              <Link to={{ pathname: item.href, search: item.search || "" }}>
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};
