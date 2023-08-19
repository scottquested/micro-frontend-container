import Button from 'mfe_components/Button';
import MainApp1 from 'pages/App1';
import MainApp2 from 'pages/App2';
import './app.css';

const App = () => {
  return (
    <div className="m-3 flex flex-col gap-3">
      <div className="border border-blue-300 p-3 text-center">
        <p>Hello from MFE Container!</p>
        <Button>Button from MFE components in Container</Button>
      </div>
      <MainApp1 />
      <MainApp2 />
    </div>
  );
};

export default App;
