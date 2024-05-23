import { CUSTOMER_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";



  export const getCustomerDetail = async (id) => {
    const response = await fetch(`${CUSTOMER_URL}/getUserDetail/${id}`, {
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


  export const updateCustomer = async(id,data) => {
    const response = await fetch(`${CUSTOMER_URL}/updateUser/${id}`, {
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


  export const deleteCustomer = async(id,data) => {
    const response = await fetch(`${CUSTOMER_URL}/deleteCategory/${id}`, {
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


  export const getAllCustomers = async() => {
    const response = await fetch(`${CUSTOMER_URL}/getAllUsers`, {
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