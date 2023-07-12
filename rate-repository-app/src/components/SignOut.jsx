import { useNavigate } from "react-router-native";
import { useSignOut } from "../hooks/useSignOut";
import { useEffect } from "react";

const SignOut = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut().then(() => navigate("/signin"));
  }, []);

  return null;
};

export default SignOut;
