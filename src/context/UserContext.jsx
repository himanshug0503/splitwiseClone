import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  return (
    <UserContext.Provider
      value={{ user, setUser, friends, setFriends, groups, setGroups }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
