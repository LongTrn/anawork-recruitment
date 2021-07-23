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
				<Route path="/job-list"><JobListPage /></Route>
				<Route path="/job-detail/:id"><JobDetailPage /></Route>
			</Switch>
			{/* <Recruitment/> */}
		</Router>
	);
}

export default App;
