import React from 'react'
import IBGENoticias from '../components/IBGENoticias'
import Header from '../components/Header'
import NoticiasTable from '../components/NoticiasTable'

function News() {
  return (

    <div>
      <Header />
      <NoticiasTable />
      {/* <IBGENoticias /> */}
    </div>
  )
}

export default News