import { RESULT_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";

export const createResult = async (data) => {
  const response = await fetch(`${RESULT_URL}/createResult`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${getTokenFromCookie()}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getAllResults = async () => {
  const response = await fetch(`${RESULT_URL}/getAllResults`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${getTokenFromCookie()}`,
      "Cache-Control": "no-cache",
    },
  });
  return await response.json();
};


export const getResultDetail = async (id) => {
    const response = await fetch(`${RESULT_URL}/getResultDetail/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${getTokenFromCookie()}`,
        "Cache-Control": "no-cache",
      },
    });
    return await response.json();
  };


  export const updateResult = async(id,data) => {
    const response = await fetch(`${RESULT_URL}/updateResult/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json',
        'Cookie': `${getTokenFromCookie()}`
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  }

  export const sendResultToUser = async(id,data) => {
    const response = await fetch(`${RESULT_URL}/sendResultToUser/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json',
        'Cookie': `${getTokenFromCookie()}`
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  }


  export const deleteResult = async(id,data) => {
    const response = await fetch(`${RESULT_URL}/deleteResult/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json',
        'Cookie': `${getTokenFromCookie()}`
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  }