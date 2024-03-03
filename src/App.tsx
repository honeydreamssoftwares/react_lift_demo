import "./App.css";

import LiftController from './LiftController';

import {
  RecoilRoot,
} from 'recoil';


function App() {
  return (
    <>
<RecoilRoot>
<div className="container mx-auto font-sans">
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">React Lift</h1>
   <LiftController />
   </div>
</RecoilRoot>
     
    </>
  );
}

export default App;
