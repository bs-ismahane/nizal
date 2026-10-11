
/* =========================
   NIZAL CART PRODUCTS
========================= */

const INITIAL_PRODUCTS = [
  {
    id: "gloves",
    name: "NIZAL PRO BOXING GLOVES",
    category: "GANTS DE BOXE DE COMPÉTITION",
    description:
      "Cuir véritable premium · Rembourrage multi-couches haute densité",
    size: "12 oz",
    color: "Noir & Rouge NIZAL",
    price: 7500,
    image:
      "../assest/article.png"
  },
  {
    id: "short",
    name: "SHORT DE COMBAT NIZAL PRO FIGHT",
    category: "VÊTEMENTS DE COMBAT",
    description:
      "Tissu technique respirant · Coupe ergonomique · Liberté de mobilité",
    size: "L",
    color: "Noir / Rouge",
    price: 3800,
    image:
      "../assest/article2.png"
  }
];


/* =========================
   HTML ELEMENTS
========================= */

const cartItems = document.querySelector("#cartItems");
const cartLayout = document.querySelector("#cartLayout");
const orderSummary = document.querySelector("#orderSummary");

const cartHeading = document.querySelector(".cart-heading");
const headingDescription =
  document.querySelector("#headingDescription");

const headingItemCount =
  document.querySelector("#headingItemCount");

const breadcrumb = document.querySelector("#cartBreadcrumb");
const emptyCart = document.querySelector("#emptyCart");

const subtotalElement = document.querySelector("#subtotal");
const discountElement = document.querySelector("#discount");
const totalElement = document.querySelector("#total");

const checkoutButton =
  document.querySelector("#checkoutButton");

const checkoutMessage =
  document.querySelector("#checkoutMessage");


/* =========================
   CART STATE
========================= */

// المنتجات الافتراضية فقط، بدون localStorage
let cart = INITIAL_PRODUCTS.map(product => ({ ...product }));


/* =========================
   PRICE CALCULATIONS
========================= */

// تنسيق السعر بالدينار الجزائري
function formatPrice(amount) {
  return `${Math.round(amount).toLocaleString("fr-FR")} DA`;
}

// حساب مجموع المنتجات
function getSubtotal() {
  return cart.reduce(
    (sum, product) => sum + product.price,
    0
  );
}

// لا توجد تخفيضات في هذه النسخة
function getDiscount() {
  return 0;
}

// حساب السعر النهائي
function getTotal() {
  return Math.max(0, getSubtotal() - getDiscount());
}


/* =========================
   DISPLAY PRODUCTS
========================= */

function renderCart() {
  const hasItems = cart.length > 0;

  // يبقى العنوان ظاهرًا دائمًا
  cartHeading.hidden = false;

  // إخفاء الوصف والعناصر الأخرى عند فراغ السلة
  headingDescription.hidden = !hasItems;
  breadcrumb.hidden = !hasItems;
  cartLayout.hidden = !hasItems;
  orderSummary.hidden = !hasItems;
  emptyCart.hidden = hasItems;

  // تحديث عدد المنتجات في العنوان
  headingItemCount.textContent =
    `(${cart.length} article${cart.length > 1 ? "s" : ""})`;

  if (!hasItems) {
    cartItems.innerHTML = "";
    checkoutMessage.textContent = "";
    return;
  }

  cartItems.innerHTML = cart.map(product => `
    <article class="cart-item"
      data-product-id="${product.id}">

      <div class="product-visual">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy">
      </div>

      <div class="product-info">

        <div class="product-category">
          ${product.category}
        </div>

        <h2 class="product-name">
          ${product.name}
        </h2>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="product-meta">
          <span>
            Taille : <strong>${product.size}</strong>
          </span>

          <span>
            Couleur : <strong>${product.color}</strong>
          </span>
        </div>

        <div class="product-actions">
          <button
            class="remove-button"
            type="button"
            data-action="remove">
            ✕ Supprimer
          </button>
        </div>

      </div>

      <div class="product-price">
        <span class="stock-badge">✓ En stock</span>

        <span class="price-label">
          Prix unitaire
        </span>

        <strong class="price-value">
          ${formatPrice(product.price)}
        </strong>
      </div>

    </article>
  `).join("");

  // تحديث جميع الأسعار
  updatePrices();
}


/* =========================
   UPDATE PRICE SUMMARY
========================= */

function updatePrices() {
  subtotalElement.textContent = formatPrice(getSubtotal());
  discountElement.textContent = formatPrice(getDiscount());
  totalElement.textContent = formatPrice(getTotal());
}


/* =========================
   REMOVE PRODUCTS
========================= */

cartItems.addEventListener("click", event => {
  const button = event.target.closest('[data-action="remove"]');

  if (!button) return;

  const productElement = button.closest("[data-product-id]");

  if (!productElement) return;

  const productId = productElement.dataset.productId;

  // حذف المنتج الذي ضغط المستخدم على زر حذفه
  cart = cart.filter(product => product.id !== productId);

  // إعادة تحديث الصفحة
  renderCart();
});


/* =========================
   CHECKOUT DEMO
========================= */

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;

  window.location.href = "confirme.html";
});


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  });
}


/* =========================
   INITIAL RENDER
========================= */

renderCart();