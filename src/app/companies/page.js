import CompanyList from '@/components/companies/CompanyList'
import MainContentTitle from '@/components/global/mainContent/MainContentTitle'
import React from 'react'

const page = () => {
  return (
    <>
     <MainContentTitle title="Companies"></MainContentTitle> 
     <CompanyList/>
    </>
  )
}

export default page
