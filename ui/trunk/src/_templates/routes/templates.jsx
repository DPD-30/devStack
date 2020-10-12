import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import Forms from "../pages/templates/forms/index.jsx";
import BasicForm from "../pages/templates/forms/basicForm.jsx";
import BreadCrumbs from "../pages/templates/forms/breadcrumbs.jsx";
import Buttons from "../pages/templates/forms/buttons.jsx";
import AllInputsForm from "../pages/templates/forms/allInputs.jsx";

import Investigation from "../pages/templates/investigation/index.jsx";
import NotificationHome from "../pages/templates/notification/index.jsx";
import NotificationTypes from "../pages/templates/notification/notificationTypes.jsx";
import Notification from "../pages/templates/notification/notification.jsx";

import Planning from "../pages/templates/planning/index.jsx";


import Home from "../pages/templates/index.jsx";
import Table from "../pages/templates/table/list.jsx";

import Search from "../pages/templates/search/search.jsx";

function templates() {
  return (
    <>
      <Route path="/templates/search" exact={true} component={Search} />
      <Route path="/templates/table" exact={true} component={Table} />
      <Route path="/templates/posts" exact={true} component={Search} />
      <Route path="/templates/forms" exact={true} component={Forms} />
      <Route path="/templates/forms/basicform" exact={true} component={BasicForm} />
      <Route path="/templates/forms/breadcrumbs" exact={true} component={BreadCrumbs} />
      <Route path="/templates/forms/buttons" exact={true} component={Buttons} />
      <Route path="/templates/forms/allInputs" exact={true} component={AllInputsForm} />
      
      <Route path="/templates/investigation" exact={true} component={Investigation} />
      <Route path="/templates/notification/notificationtypes" exact={true} component={NotificationTypes} />
      <Route path="/templates/notification/notification" exact={true} component={Notification} />
      
      <Route path="/templates/notification" exact={true} component={NotificationHome} />
      <Route path="/templates/planning" exact={true} component={Planning} />
      

      <Route
        path="/templates/investigation"
        exact={true}
        component={Search}
      />
      <Route path="/templates" exact={true} component={Home} />
    </>
  );
}

export default withRouter(templates);
