import { removeProductFromDetail } from "../../controllers/detail.js";

class DetailComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <div class="container mt-4">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0" style="color:rgb(0, 0, 0);">Detalle de la Compra</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table id="detailTable" class="table table-bordered align-middle">
                <thead class="text-white" style="background-color:rgb(0, 0, 0);">
                  <tr>
                    <th scope="col">Cod</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Valor Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody class="text-center"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const tableBody = this.shadowRoot.querySelector("tbody");

    document.addEventListener("detailUpdated", (event) => {
      const details = event.detail;

      // Limpiar la tabla antes de volver a renderizar
      tableBody.innerHTML = "";

      // Renderizar cada fila
      details.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${product.cod}</td>
          <td>${product.product}</td>
          <td>${product.price.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
          <td>${product.quantity}</td>
          <td>$${product.subtotal.toFixed(2)}</td>
          <td>
            <button class="btn btn-outline-danger btn-sm remove-btn" data-cod="${product.cod}">
              <i class="bi bi-trash3"></i> Eliminar
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      });

      // Evento click de los botones de eliminar producto
      tableBody.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          const cod = event.target.dataset.cod;
          removeProductFromDetail(cod); // Eliminar producto
        });
      });
    });

    // Limpiar los detalles cuando se emita el evento 'clearDetail'
    document.addEventListener("clearDetail", () => {
      tableBody.innerHTML = ""; // Limpiar los productos de la tabla
    });
  }
}

customElements.define("detail-component", DetailComponent);




