import './styles/App/App.scss';
import './styles/index.scss';
import { Recruitment, JobList, JobDetail, } from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/"><Recruitment /></Route>
				<Route path="/job-list"><JobList /></Route>
				<Route path="/job-detail/:id"><JobDetail /></Route>
			</Switch>
			{/* <Recruitment/> */}
		</Router>
	);
}

export default App;
