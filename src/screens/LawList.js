import React from 'react'
import Table from '../components/Table'
import Header from '../components/Header'

function LawList() {
  return (
    <div>
        <Header />
        <div style={{ padding: 30 }}>
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <h1>Seja bem vindo(a) ao Nossa Lei!</h1><br />
      <h3>Queremos viabilizar e facilitar a participação popular na criação de leis<br />
      e abaixo assinados. Aqui você pode visualizar, assinar e criar leis e abaixo assinados.<br />
      Somos uma plataforma de participação popular e democracia digital<br />
      criada por uma equipe de formandos em Análise e Desenvolvimento de Sistemas<br />
      da Faculdade Unicesusc.</h3>


      </div>
        <h1 style={{textAlign:'center'}}>Propostas de Lei</h1>
        <Table />
        </div>
    </div>
  )
}

export default LawList