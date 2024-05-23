import {  STATISTICS_URL } from "./api";
import { getTokenFromCookie } from "../helpers/getCookie";




  export const getUserStatistics = async() => {
    const response = await fetch(`${STATISTICS_URL}/getUserStatistics`, {
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


export const getAdminStatistics = async() => {
  const response = await fetch(`${STATISTICS_URL}/getAdminStatistics`, {
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