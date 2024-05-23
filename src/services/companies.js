import { BASE_URL, COMPANY_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";


export const addCompanies = async(data,id) => {
    const response = await fetch(`${COMPANY_URL}/createCompany`, {
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


  export const getAllCompanies = async() => {
    const response = await fetch(`${COMPANY_URL}/getAllCompanies`, {
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