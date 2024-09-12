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
          <br />
          <h2>Constituição Federal artigo 1º parágrafo único:</h2>
          <h2>“Todo o poder emana do povo, que o exerce por meio de representantes<br />
        eleitos ou DIRETAMENTE, nos termos desta Constituição.”</h2><br />

      <h3>Queremos viabilizar e facilitar a criação de propostas de leis<br />
      de iniciativa popular e abaixo assinados.<br />
      Aqui você pode visualizar, assinar e criar propostas de leis e abaixo assinados.<br />
      Somos uma plataforma de participação popular e democracia digital<br />
      criada por uma equipe de formandos em Análise e Desenvolvimento de Sistemas<br />
      da Faculdade Unicesusc.</h3><br />

      <p><h3>Leis Federais:</h3><br />

Na esfera federal, a Constituição Federal de 1988 prevê a possibilidade de apresentação<br />
de projetos de lei de iniciativa popular. O artigo 61, §2º da Constituição estabelece que:<br />
<br />
    A proposta de lei precisa ser assinada por no mínimo 1% do eleitorado nacional.<br />
    As assinaturas devem estar distribuídas por pelo menos 5 estados,<br />
    com um mínimo de 0,3% dos eleitores de cada um desses estados.<br />

Atualmente, com base nos números do Tribunal Superior Eleitoral (TSE),<br />
o eleitorado brasileiro está na casa dos 156 milhões de eleitores, então<br />
aproximadamente 1,56 milhão de assinaturas seriam necessárias para uma<br />
proposta de iniciativa popular no âmbito federal.<br />
<br />
<h3>Leis Estaduais:</h3><br />

Cada estado tem a liberdade de estabelecer suas próprias regras para<br />
leis de iniciativa popular, baseando-se em suas constituições estaduais.<br />
Embora as regras possam variar, elas geralmente seguem um formato semelhante ao federal.<br />

Em muitos estados, é necessário o apoio de 1% do eleitorado estadual.<br />
    Algumas constituições estaduais também exigem que as assinaturas sejam<br />
    distribuídas por vários municípios, com um percentual mínimo de eleitores de cada um.<br />
    <br />

    <h3>Leis Municipais:</h3><br />

No âmbito municipal, a Lei Orgânica de cada município define as regras para a iniciativa popular.<br />
As exigências variam de cidade para cidade, mas geralmente seguem critérios semelhantes aos seguintes:<br />

    A proposta de lei deve ser assinada por 5% dos eleitores do município.<br />

Essa porcentagem pode variar conforme a legislação de cada município,<br />
mas a regra de 5% do eleitorado é bastante comum nas Leis Orgânicas Municipais.</p><br />


      </div>
        <h1 style={{textAlign:'center'}}>Propostas de Lei</h1>
        <Table />
        </div>
    </div>
  )
}

export default LawList