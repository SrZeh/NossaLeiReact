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
      <Table />
    </div>
  );
}

export default LawList;