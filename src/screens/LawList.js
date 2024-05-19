import React from 'react'
import Table from '../components/Table'
import Header from '../components/Header'

function LawList() {
  return (
    <div>
        <Header />
        <div style={{ padding: 30 }}>
        <h1 style={{textAlign:'center'}}>Propostas de Lei</h1>
        <Table />
        </div>
    </div>
  )
}

export default LawList