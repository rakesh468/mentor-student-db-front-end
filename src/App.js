import "./App.css";
import { Addmentor } from "./components/Addmentor";
import { Addstudent } from "./components/Addstudent";
import { Mentorlist } from "./Mentor";
import { Studentlist } from "./student";
import { Switch, Route } from "react-router-dom";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Button color="inherit" onClick={() => history.push("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => history.push("/students")}>
            Students
          </Button>
          <Button color="inherit" onClick={() => history.push("/mentors")}>
            Mentors
          </Button>
          <Button
            color="inherit"
            onClick={() => history.push("/create_mentor")}
          >
            Add Mentor
          </Button>
          <Button
            color="inherit"
            onClick={() => history.push("/create_student")}
          >
            Add student
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route path="/students">
          <Studentlist />
        </Route>
        <Route path="/mentors">
          <Mentorlist />
        </Route>
        <Route path="/create_mentor">
          <Addmentor />
        </Route>
        <Route path="/create_student">
          <Addstudent />
        </Route>
      </Switch>
    </div>
  );
}

function WelcomePage() {
  return (
    <div>
      <h2> Welcome to JGVV</h2>
    </div>
  )
}
export default App;
