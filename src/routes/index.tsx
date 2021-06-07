import { Switch } from "react-router-dom";
import { CreateListPage } from "../pages/CreateListPage";
import { HomePage } from "../pages/HomePage/index";
import { ListItems } from "../pages/ListItems";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Route } from './Route';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/homepage" exact component={HomePage} isPrivate />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" exact component={SignIn} />
            <Route path="/createlist" exact component={CreateListPage} isPrivate />
            <Route path="/list/:id" exact component={ListItems} isPrivate />
            <Route path="*" exact component={NotFound} isPrivate />
        </Switch>
    );
};