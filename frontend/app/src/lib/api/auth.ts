import client from "./client";
import { SignUpParams, SignInParams } from "../../interfaces";

export const getAuthHeaders = () => {
  return {
    "access-token": localStorage.getItem("access-token"),
    client: localStorage.getItem("client"),
    uid: localStorage.getItem("uid"),
  };
};

export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};

export const signIn = (params: SignInParams) => {
  return client.post("/auth/sign_in", params);
};

export const signOut = () => {
  return client.delete("/auth/sign_out", { headers: getAuthHeaders() });
};

export const getCurrentUser = () => {
  return client.get("/auth/sessions", { headers: getAuthHeaders() });
};
