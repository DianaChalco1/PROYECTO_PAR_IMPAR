class InputRange extends HTMLElement {
  //Creamos el constructor
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
        /* Estilo para el componente */
        :host {
          display: block; 
          font-family: "Poppins", sans-serif;
          padding: 1.5rem;
          border: 1px solid #d0d7de;
          border-radius: 12px;
          max-width: 320px;
          margin: 2rem auto; 
          background-color: #ffffff;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }
        /* Estilos para el título */
        h2 {
          color: #1f2937;
          font-size: 1.6rem;
          margin-bottom: 1.2rem;
          text-align: center;
        }

        /* Estilos para las etiquetas */
        label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-weight: 500;
          color: #374151;
        }

        /* Estilos para los inputs */
        input[type="number"] {
          width: 100px; 
          padding: 0.5rem;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 1rem;
          text-align: center;
        }
        /* Estilos para el botón */
        button {
          display: block; 
          width: 100%;
          padding: 0.75rem;
          background-color: #72cde1ff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 1.5rem;
        }
        /* Estilo del botón al pasar el mouse */
        button:hover {
          background-color: #5bc7c7ff;
        }
      </style>
      <h2>Selecciona un rango</h2>
      <label>Inicio: <input type="number" id="inicio" value="1" /></label>
      <label>Fin: <input type="number" id="fin" value="10" /></label>
      <button id="enviar">Enviar</button>
    `;

    // Acceder al botón a través del shadowRoot
    const button = this.shadowRoot.querySelector("#enviar");
    button.addEventListener("click", () => this.enviarRango());
  }

  enviarRango() {
    // Acceder a los inputs a través del shadowRoot
    const inicioInput = this.shadowRoot.querySelector("#inicio");
    const finInput = this.shadowRoot.querySelector("#fin");

    // Obtener los valores de los inputs
    const inicio = parseInt(inicioInput.value);
    const fin = parseInt(finInput.value);

    // Validaciones solicitadas
    if (isNaN(inicio) || isNaN(fin)) {
      alert("Por favor ingresa solo valores numéricos.");
      return;
    }
    if (inicio > fin) {
      alert("El inicio debe ser menor o igual que el fin.");
      return;
    }

    // Se establece la comunicación entre los componentes mediante eventos personalizados
    const evento = new CustomEvent("rango-seleccionado", {
      //Contiene dos campos numéricos: inicio y fin del rango.
      detail: { inicio, fin },
      // Permite que el evento se propague a través del DOM y sea escuchado por otros componentes.
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(evento);
  }
}
// Definimos el componente para capturar el rango numérico (input-range).
customElements.define("input-range", InputRange);
