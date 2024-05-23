import { QUESTIONS_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";

export const createQuestion = async (data) => {
  const response = await fetch(`${QUESTIONS_URL}/createQuestion`, {
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

export const getAllQuestions = async (id) => {
  const response = await fetch(`${QUESTIONS_URL}/getAllQuestions/${id}`, {
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


export const getQuestionDetail = async (id) => {
    const response = await fetch(`${QUESTIONS_URL}/getQuestionDetail/${id}`, {
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


  export const updateQuestion = async(id,data) => {
    const response = await fetch(`${QUESTIONS_URL}/updateQuestion/${id}`, {
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


  export const deleteQuestion = async(id,data) => {
    const response = await fetch(`${QUESTIONS_URL}/deleteQuestion/${id}`, {
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