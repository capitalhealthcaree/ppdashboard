import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Topbar from "./Topbar";
import Blog from "../Blog";
import Faq from "../Faq";
import FaqList from "../FaqList";
import News from "../News";
import NewsList from "../NewsList";
import Appointments from "../Appointment";
import CallHistory from "../CallHistory";
import BlogList from "../BlogList";
import EditBlog from "../BlogList/blogEdit";
import EditNews from "../NewsList/editNews";
import EditFaq from "../FaqList/faqEdit";
import Treatments from "../treatments";
import TreatmentsList from "../treatmentsList";
import TreatmentsEdit from "../treatmentsEdit";

import Assets from "../Assets";
import AddAssets from "../AddAssets";
import FolderWiseAssets from "../FolderWiseAssets";

import BlogSeachReasult from "../BlogSearch";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="/" component={() => "Premier Pian Dashboard"} />
      <Route exact path="/blogs" component={() => <Blog />} />
      <Route exact path="/faq" component={() => <Faq />} />
      <Route exact path="/faqlist" component={() => <FaqList />} />
      <Route exact path="/news" component={() => <News />} />
      <Route exact path="/newslist" component={() => <NewsList />} />
      <Route exact path="/bloglist" component={() => <BlogList />} />
      <Route exact path="/blogedit" component={() => <EditBlog />} />
      <Route
        exact
        path="/blogSeachReasult"
        component={() => <BlogSeachReasult />}
      />
      <Route exact path="/newsedit" component={() => <EditNews />} />
      <Route exact path="/faqedit" component={() => <EditFaq />} />
      <Route exact path="/appointments" component={() => <Appointments />} />
      <Route exact path="/callHistory" component={() => <CallHistory />} />
      <Route exact path="/treatments" component={() => <Treatments />} />
      <Route
        exact
        path="/treatments-edit"
        component={() => <TreatmentsEdit />}
      />
      <Route
        exact
        path="/treatmentslist"
        component={() => <TreatmentsList />}
      />
      <Route exact path="/add-assets" component={() => <AddAssets />} />
      <Route exact path="/assets" component={() => <Assets />} />
      <Route
        exact
        path="/folderWiseAssets"
        component={() => <FolderWiseAssets />}
      />
    </Switch>
  </Container>
);

export default Content;
