class ParImparLista extends HTMLElement {
  // Creamos el constructor
  constructor() {
    super();
    // Creamos el shadow DOM
    this.attachShadow({ mode: "open" });
  }
  // Creamos el método connectedCallback
  connectedCallback() {
    // Estilos para el componente
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: sans-serif;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          max-width: 300px;
          margin: 1rem auto;
          background-color: #f9f9f9;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          color: #333;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0; 
        }

        li {
          padding: 0.5rem 0; 
          border-bottom: 1px solid #eee; 
          color: #444;
          display: flex;
          justify-content: center; 
          align-items: center;
          font-size: 1.05rem;
        }

 
        /* Estilos diferentes para cada número par o impar */
        li:nth-child(even) { 
          background-color: #f0f8ff; 
        }

        li:nth-child(odd) { 
          background-color: #fdfdfd; 
        }

      </style>
    
      <h2>Resultados</h2>
      <ul id="lista"></ul>
    `;

    // Detectar y manejar eventos de cambio en los controles de tipo range en toda la ventana
    window.addEventListener("rango-seleccionado", (e) => {
      const inicio = e.detail.inicio;
      const fin = e.detail.fin;
      // Llamamos al método para mostrar la lista
      this.mostrarLista(inicio, fin);
    });
  }

  // Método para mostrar la lista de números pares e impares
  mostrarLista(inicio, fin) {
    const ul = this.shadowRoot.querySelector("#lista");
    ul.innerHTML = "";
    for (let numero = inicio; numero <= fin; numero++) {
      const elemento = document.createElement("li");
      let tipo;
      if (numero % 2 === 0) {
        tipo = "PAR";
      } else {
        tipo = "IMPAR";
      }

      elemento.textContent = numero + " - " + tipo;
      ul.appendChild(elemento);
    }
  }
}
// Definimos el componente para mostrar los resultados (par-impar-lista).
customElements.define("par-impar-lista", ParImparLista);
