import React,{useState, createContext, useEffect} from 'react'
import GlobalContext from "./GlobalContext";


const GlobalContextProvider = ({children}) => {

  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhone] = useState(false);
  const [role, setRole] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    const storedRole = localStorage.getItem("userRole");

    if(storedPhone && storedRole){
      setIsLogin(true);
      setPhone(storedPhone);
      setRole(storedRole);
      setUserRole(storedRole);
    }
  },[]);


  return (
    <GlobalContext.Provider value={{isLogin, setIsLogin, phone, setPhone, role, setRole, userRole, setUserRole}}>
        {children}
    </GlobalContext.Provider>
 
  )
}

export default GlobalContextProvider
