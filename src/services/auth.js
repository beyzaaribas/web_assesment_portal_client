import { AUTH_URL, BASE_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";

export const login = async(data) => {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
}

export const createUser = async(data) => {
  const response = await fetch(`${AUTH_URL}register`, {
    method: 'POST',
    credentials: 'include',
    headers:{
      'Content-Type': 'application/json',
      'Cookie': `${getTokenFromCookie()}`
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}