import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
import { Icon } from 'semantic-ui-react';
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

function Sidebar() {
  let navigate = useNavigate();
  return (
    <>
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId="/management/members"
        onSelect={({ itemId }) => {
          navigate(itemId);
          // maybe push to the route
        }}
        items={[
          {
            title: "Login",
            itemId: "/login",
            // you can use your own custom Icon component as well
            // icon is optional
            elemBefore: () => <Icon name="inbox" />,
          },
          {
            title: "Signup",
            itemId: "/signup",
            elemBefore: () => <Icon name="users" />,
          },
        ]}
      />
    </>
  );
}

export default Sidebar;
