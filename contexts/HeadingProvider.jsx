import { createContext, useState } from "react";

export const HeadingContext = createContext();

const HeadingProvider = ({ children }) => {
  const [heading, setHeading] = useState("");

  const handleSetHeading = (text) => {
    setHeading(text)
  }

  return (
    <HeadingContext.Provider value={{heading, handleSetHeading}}>
      {children}
    </HeadingContext.Provider>
  );
};

export default HeadingProvider;
