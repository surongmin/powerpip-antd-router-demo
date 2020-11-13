import './App.css';
import { HashRouter as Router } from 'react-router-dom'
import { projectRoutes } from './routes'
import Frame from './components/Frame'
import { renderRoutes } from 'react-router-config';


function App() {
  
  return (
    <Router>
      <Frame>

        {
          renderRoutes(projectRoutes)
        }

        {/* <Switch>
          {projectRoutes.map((route, i) => (
            // <RouteWithSubRoutes key={i} {...route} />
            <Route
              path={route.path}
              key={i}
              {...route}
              render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.subroutes} />
              )}
           />
          ))}
        </Switch> */}
      </Frame >
    </Router >
  );
}

export default App;
