import { createContext, useState } from 'react';

const SubmissionsContext = createContext();

export function SubmissionsProvider({ children }) {
  const [submissions, setSubmissions] = useState([]);

  const addSubmission = (submission) => {
    setSubmissions((prevSubmissions) => [...prevSubmissions, submission]);
  };

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionsContext.Provider>
  );
}

export default SubmissionsContext;