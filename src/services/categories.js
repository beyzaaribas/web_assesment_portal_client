import { CATEGORY_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";


export const createCategory = async(data,id) => {
    const response = await fetch(`${CATEGORY_URL}/createCategory`, {
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

  export const getCategoryDetail = async (id) => {
    const response = await fetch(`${CATEGORY_URL}/getCategoryDetail/${id}`, {
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


  export const updateCategory = async(id,data) => {
    const response = await fetch(`${CATEGORY_URL}/updateCategory/${id}`, {
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


  export const deleteCategory = async(id,data) => {
    const response = await fetch(`${CATEGORY_URL}/deleteCategory/${id}`, {
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


  export const getAllCategories = async() => {
    const response = await fetch(`${CATEGORY_URL}/getAllCategories`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `${getTokenFromCookie()}`,
          'Cache-Control': 'no-cache'
        },
      });
      return await response.json();
}