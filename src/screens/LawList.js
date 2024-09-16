
import React, { useEffect } from 'react';
import Table from '../components/Table';
import Header from '../components/Header';

function LawList() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 } // Elemento precisa estar 10% visível para ativar animação
    );

    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div>
      <Header />
      <div style={{flex: "row"}} className="law-list-container">
        <div className="main-content">
          <div className="text-block center-content fade-in">
            <h1>Bem-vindo(a) ao Nossa Lei!</h1>
          </div>
          <div className="text-block slide-left center-content fade-in">
            <h2>Constituição Federal, Artigo 1º, Parágrafo Único:</h2>
          </div>
          <div style={{alignItems:'center'}} className="text-block slide-right center-content">
            <h2 style={{textAlign: 'center', fontSize: '20px', maxWidth: '75%'}}>
              “Todo poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição.”
            </h2>
          </div>
          <div style={{borderColor: '#000', borderLeft: '2px solid', padding:'20px', borderRadius:'10px',display: 'inline-block'}} className="fade-in left-content">
            <p style={{textAlign: 'left', fontSize: '20px', maxWidth: '50%', position:'right'}}>
              Nosso objetivo é facilitar a criação de propostas de leis de iniciativa popular e abaixo-assinados. Aqui, você pode visualizar,
              apoiar e criar propostas de leis e abaixo-assinados, contribuindo diretamente para a democracia digital.
            </p>
          </div>
          <div style={{borderColor: '#000', borderRight: '2px solid', padding:'20px', borderRadius: '10px',}} className="text-block fade-in right-content">
            <p style={{textAlign:'right', maxWidth: '50%', fontSize: '20px'}}>
              Somos uma plataforma de participação popular desenvolvida por estudantes de Análise e Desenvolvimento de Sistemas da Faculdade
              Unicesusc, comprometidos em promover a cidadania ativa.
            </p>
          </div>

  <div className="main-content slide-right">
    <div className="text-block slide-right">
      
      <p style={{maxWidth:'40%'}} className="right-text">
      <h3 className="centered-title">Leis Federais:</h3>
        A Constituição Federal de 1988 permite a apresentação de projetos de lei por iniciativa popular. Segundo o artigo 61, §2º:
        <br /><br />
        A proposta deve ser assinada por pelo menos 1% do eleitorado nacional, distribuídas em pelo menos 5 estados, com no mínimo 0,3%
        dos eleitores de cada estado.
        <br /><br />
        Atualmente, com base nos dados do Tribunal Superior Eleitoral (TSE), o Brasil possui cerca de 156 milhões de eleitores. Isso
        significa que aproximadamente 1,56 milhão de assinaturas seriam necessárias para uma proposta de iniciativa popular em âmbito
        federal.
      </p>
    </div>

    <div className="text-block slide-right">
      
      <p style={{maxWidth:'40%'}} className="left-text">
      <h3 className="centered-title">Leis Estaduais:</h3>
        As regras para leis de iniciativa popular em nível estadual variam de estado para estado, conforme suas constituições, mas seguem
        um formato semelhante ao federal.
        <br /><br />
        Em geral, exige-se o apoio de 1% do eleitorado estadual, distribuído em vários municípios com percentuais mínimos de eleitores
        em cada um.
      </p>
    </div>

    <div className="main-content">
 

<div className="text-block slide-left">
      
      <p style={{maxWidth:'40%'}} className="right-text fade-in">
      <h3 className="centered-title">Leis Municipais:</h3>
        A Lei Orgânica de cada município define as regras para a apresentação 
        de propostas de lei por iniciativa popular. 
        Normalmente, exige-se que a proposta seja assinada por 5% do eleitorado municipal, 
        mas esse percentual pode variar conforme a legislação local.
      </p>
    </div>
    </div>
    
  </div>
</div>

<Table />
        </div>
        
        
        
      </div>
      
    // </div>
  );
}

export default LawList;
