import axios from "axios";
import Cookies from "js-cookie";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";

export interface UserModel {
  id: number;
  name: string;
  role: string;
  email: string;
  bio: string;
  location: string;
  subdomain: string | null;
}

interface UserContextType {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

export const userContext = createContext<UserContextType | undefined>(
  undefined,
);

interface userProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    function fetchUser() {
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) {
        return;
      }
      axios
        .get(`http://lvh.me:3001/api/v1/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${jwtToken}`,
          },
        })
        .then((res) => {
          const attrs = res.data.data.attributes;
          const userData: UserModel = {
            id: Number(attrs.id),
            name: attrs.name,
            role: attrs.role,
            email: attrs.email,
            bio: attrs.bio,
            location: attrs.location,
            subdomain: attrs.subdomain,
          };

          console.log("hello");
          console.log(userData);
          setUser(userData);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setUser(null);
        });
    }

    fetchUser();
  }, [window.location.hostname.split(".")[0]]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
