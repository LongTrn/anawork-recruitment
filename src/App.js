import './styles/App/App.scss';
import './styles/index.scss';
import { RecruitmentPage, JobListPage, JobDetailPage, } from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/"><RecruitmentPage /></Route>
				<Route exact path="/job-list"><JobListPage /></Route>
				<Route path="/job-list/job-detail/:idJobDetail"><JobDetailPage /></Route>
			</Switch>
		</Router>
	);
}

export default App;
