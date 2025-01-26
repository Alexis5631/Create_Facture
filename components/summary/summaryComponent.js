import { calculateSummary, processPayment } from "../../controllers/summary.js";

class SummaryComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0" style="color:rgb(0, 0, 0);">Resumen de Factura</h3>
          </div>
          <div class="card-body">
            <div class="row mb-4 align-items-center">
              <label class="col-md-4 col-form-label fw-bold">Subtotal</label>
              <div class="col-md-8">
                <input id="subtotal" class="form-control text-center" type="text" value="$0.00" disabled readonly>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-4 col-form-label fw-bold">IVA (19%)</label>
              <div class="col-md-8">
                <input id="iva" class="form-control text-center" type="text" value="$0.00" disabled readonly>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-4 col-form-label fw-bold">Total</label>
              <div class="col-md-8">
                <input id="total" class="form-control text-center" type="text" value="$0.00" disabled readonly>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button id="submitBtn" class="btn btn-outline-primary btn-lg w-75">Pagar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    calculateSummary(this);

    // Evento click para el pago de la factura
    const payButton = this.shadowRoot.querySelector("#submitBtn");
    payButton.addEventListener("click", () => {
      processPayment(this);
    });
  }
}

customElements.define("summary-component", SummaryComponent);


