import React from 'react';
import Principal from './components/Principal';
import Employees from './components/Employees';
import Foot from './components/Foot';
import EmployeeForm from './components/EmployeeForm';
import AreasJobs from './components/AreasJobs';
import Jobs from './components/Jobs';
import AddAreaAndPositionForm from './components/AddAreaAndPositionForm';
import './index.css'; // Asegúrate de que Tailwind CSS esté importado

function App() {
  return (
    <div className="App">
      <section id="home">
        <Principal />
      </section>
      <section id="employees">
        <Employees />
      </section>
      <section id="addEmployee">
        <EmployeeForm />
      </section>
      <section id="areas">
        <AreasJobs />
      </section>
      <section id="Jobs">
        <Jobs />
      </section>
      <section id="addAreaAndPosition">
        <AddAreaAndPositionForm />
      </section>
      <section>
        <Foot />
      </section>
    </div>
  );
}

export default App;

