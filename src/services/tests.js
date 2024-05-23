import { FINISHED_TESTS_URL, TESTS_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";

export const createTest = async (data) => {
  const response = await fetch(`${TESTS_URL}/createTest`, {
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

export const getAllTests = async () => {
  const response = await fetch(`${TESTS_URL}/getAllTests`, {
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


export const getTestDetail = async (id) => {
    const response = await fetch(`${TESTS_URL}/getTestDetail/${id}`, {
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


  export const updateTest = async(id,data) => {
    const response = await fetch(`${TESTS_URL}/updateTest/${id}`, {
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


  export const deleteTest = async(id,data) => {
    const response = await fetch(`${TESTS_URL}/deleteTest/${id}`, {
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

  export const getUserFinishedTests = async() => {
    const response = await fetch(`${FINISHED_TESTS_URL}/getFinishedTests`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${getTokenFromCookie()}`,
        "Cache-Control": "no-cache",
      },
    });
    return await response.json();
  }