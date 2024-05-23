import { ANSWERS_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";

export const createAnswer = async (data) => {
  const response = await fetch(`${ANSWERS_URL}/createAnswer`, {
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

export const getAllAnswers = async (id) => {
  const response = await fetch(`${ANSWERS_URL}/getAllAnswers/${id}`, {
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

export const getTestAnswers = async (id) => {
  const response = await fetch(`${ANSWERS_URL}/getTestAnswers/${id}`, {
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


export const getAnswerDetail = async (id) => {
    const response = await fetch(`${ANSWERS_URL}/getAnswerDetail/${id}`, {
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


  export const updateAnswer = async(id,data) => {
    const response = await fetch(`${ANSWERS_URL}/updateAnswer/${id}`, {
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


  export const deleteAnswer = async(id,data) => {
    const response = await fetch(`${ANSWERS_URL}/deleteAnswer/${id}`, {
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