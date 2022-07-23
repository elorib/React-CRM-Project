import httpService from "./http-service";
import jwtDecode from "jwt-decode";

const TOKEN = "token";

setTokenHeader();

function setTokenHeader() {
  httpService.setHeader("x-auth", getJWT());
}

export function createUser(user) {
  return httpService.post("api/users", user);
}

export async function logUser(user) {
  const { data } = await httpService.post("api/auth", user);

  localStorage.setItem(TOKEN, data.token);
  setTokenHeader();
}

export async function createBizUser(user) {
  return httpService.post("api/users", user);
}

export function logout() {
  localStorage.removeItem(TOKEN);
  setTokenHeader();
}

function getJWT() {
  return localStorage.getItem(TOKEN);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const usersService = {
  getUser,
  createUser,
  logUser,
  logout,
  getJWT,
};

export default usersService;
