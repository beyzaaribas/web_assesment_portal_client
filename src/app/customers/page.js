import CustomerList from '@/components/customers/CustomerList'
import MainContentTitle from '@/components/global/mainContent/MainContentTitle'
import React from 'react'

const page = () => {
  return (
    <>
     <MainContentTitle title="Customers"></MainContentTitle> 
     <CustomerList/>
    </>
  )
}

export default page
