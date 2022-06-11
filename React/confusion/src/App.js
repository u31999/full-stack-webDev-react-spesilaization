import './App.css';
import MainComponent from './components/MainComponent';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css'
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';

const store = configureStore();

class App extends Component {
  render() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div>
      <MainComponent />
    </div>
    </BrowserRouter>
    </Provider>
);
  }
}

export default App;
