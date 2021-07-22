import './styles/App/App.scss';
import './styles/index.scss';
import { Recruitment, JobList, } from "./components";
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
			</Switch>
			{/* <Recruitment/> */}
		</Router>
	);
}

export default App;
