// import React, { useState } from 'react'; // Added React import and quotes
// import ProfilePage from './ProfilePage';
// import SymptomPage from './SymptomPage';
// import ResultPage from './ResultPage';

// import './App.css';

// function App() {
//   // Strings like 'profile' must be in quotes
//   const [page, setPage] = useState('profile'); //page which screen should i show right npw ? profile is initial state so starting screen set page function to change the screen
//   const [result, setResult] = useState(null);

//   if (page === 'profile') {
//     return <ProfilePage onNext={() => setPage('symptom')} />;
//   }// if profile return profile page on next function is to move to next page 

//   if (page === 'symptom') {
//     return (
//       <SymptomPage 
//         onResult={(res) => { 
//           setResult(res); 
//           setPage('result'); 
//         }} 
//       />
//     );
//   }

//   return <ResultPage result={result} />;
// }

// export default App;
// import ProfilePage from "./ProfilePage";
// import SymptomPage from "./SymptomPage";
// import ResultPage from "./ResultPage";

// function App() {
//   console.log("ProfilePage:", typeof ProfilePage);
//   console.log("SymptomPage:", typeof SymptomPage);
//   console.log("ResultPage:", typeof ResultPage);

//   return <h1>Check console</h1>;
// }

// export default App;
import React, { useState } from "react";
import ProfilePage from "./ProfilePage";
import SymptomPage from "./SymptomPage";
import ResultPage from "./ResultPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("profile"); // profile | symptom | result
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-wrapper">
      {page === "profile" && (
        <ProfilePage onNext={() => setPage("symptom")} />
      )}

      {page === "symptom" && (
        <SymptomPage
          onResult={(data) => {
            setResult(data);
            setPage("result");
          }}
          setLoading={setLoading}
        />
      )}

      {page === "result" && (
        <ResultPage result={result} loading={loading} />
      )}
    </div>
  );
}

export default App;
