import { listProduct } from "../../controllers/products.js";
import { addProductToDetail } from "../../controllers/detail.js";

class ProductsComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0" style="color:rgb(0, 0, 0);">Productos</h3>
          </div>
          <div class="card-body">
            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Código de Producto</label>
              <div class="col-md-9">
                <input id="productIdInput" class="form-control text-center" type="text" value="cod" disabled readonly>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Producto</label>
              <div class="col-md-9">
                <select id="productList" class="form-select" aria-label="Seleccionar producto">
                  <option value="">Seleccione un producto</option>
                </select>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Precio Unitario</label>
              <div class="col-md-4">
                <input id="unitaryValue" class="form-control text-center" type="text" value="value" disabled readonly>
              </div>
              <label class="col-md-2 col-form-label fw-bold">Cantidad</label>
              <div class="col-md-3">
                <input id="quantity" class="form-control text-center" type="number" min="1" step="1" value="1">
              </div>
            </div>
            <div class="text-center">
              <button id="submitBtn" class="btn btn-outline-primary btn-lg w-50">
                <i class="bi bi-cart-plus"></i> Agregar a la factura
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    // Llamamos la función para llenar el select
    listProduct(this);

    const shadow = this.shadowRoot;
    const submitBtn = shadow.getElementById("submitBtn");
    const productIdInput = shadow.getElementById("productIdInput");
    const productList = shadow.getElementById("productList");
    const unitaryValueInput = shadow.getElementById("unitaryValue");
    const quantityInput = shadow.getElementById("quantity");

    submitBtn.addEventListener("click", () => {
      const productId = productIdInput.value;
      const productName = productList.options[productList.selectedIndex]?.textContent;
      
      // Aseguramos que el precio se obtiene sin formato de moneda
      const unitaryValue = parseFloat(unitaryValueInput.value.replace("$", "").trim());
      const quantity = parseInt(quantityInput.value, 10);

      if (productId && productName && !isNaN(unitaryValue) && quantity > 0) {
        const product = {
          cod: productId,
          product: productName,
          price: unitaryValue,
          quantity: quantity,
        };

        addProductToDetail(product);

        // Restablecer los valores después de agregar el producto
        quantityInput.value = "1";
        productList.value = "";
        productIdInput.value = "cod";
        unitaryValueInput.value = "value";
      } else {
        alert("Por favor, seleccione un producto y una cantidad válida.");
      }
    });
  }
}

customElements.define("products-component", ProductsComponent);

