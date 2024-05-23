import CategoryList from '@/components/categories/CategoryList'
import CompanyList from '@/components/companies/CompanyList'
import MainContentTitle from '@/components/global/mainContent/MainContentTitle'
import React from 'react'

const page = () => {
  return (
    <>
     <MainContentTitle title="Categories"></MainContentTitle> 
     <CategoryList/>
    </>
  )
}

export default page
