// -----------------------------
// Variables & Sample Data
// -----------------------------

// Sample product data (not directly tied to grid, acts as data source)
const sampleData = [
  {
    name: "Adidas Ultra Boost",
    category: "Sneaker",
    description: "Long distance running requires a lot from athletes.",
    image: "https://via.placeholder.com/60",
    price: "$110.40",
    amount: 1269
  },
  {
    name: "Adizero SL Running",
    category: "Running",
    description: "Lightweight running shoe for speed and comfort.",
    image: "https://via.placeholder.com/60",
    price: "$64.40",
    amount: 800
  },
  {
    name: "Forum Exhibit Low",
    category: "Sneaker",
    description: "Classic sneaker style with modern comfort.",
    image: "https://via.placeholder.com/60",
    price: "$74.00",
    amount: 1500
  },
  {
    name: "Nike Air Zoom Pegasus",
    category: "Running",
    description: "Responsive cushioning for everyday training.",
    image: "https://via.placeholder.com/60",
    price: "$120.00",
    amount: 950
  },
  {
    name: "Puma Future Rider",
    category: "Sneaker",
    description: "Retro style sneaker with modern comfort.",
    image: "https://via.placeholder.com/60",
    price: "$85.00",
    amount: 600
  },
  {
    name: "Callaway Golf Shoes",
    category: "Golf",
    description: "Stable and comfortable shoes for golfers.",
    image: "https://via.placeholder.com/60",
    price: "$140.00",
    amount: 300
  },
  {
    name: "Nike Mercurial Vapor",
    category: "Football",
    description: "Lightweight boots designed for speed.",
    image: "https://via.placeholder.com/60",
    price: "$200.00",
    amount: 450
  },
  {
    name: "Adidas Copa Mundial",
    category: "Football",
    description: "Classic leather football boots.",
    image: "https://via.placeholder.com/60",
    price: "$180.00",
    amount: 500
  },
  {
    name: "Under Armour HOVR Phantom",
    category: "Running",
    description: "High cushioning running shoe with energy return.",
    image: "https://via.placeholder.com/60",
    price: "$130.00",
    amount: 700
  },
  {
    name: "New Balance 574",
    category: "Sneaker",
    description: "Iconic sneaker with timeless design.",
    image: "https://via.placeholder.com/60",
    price: "$90.00",
    amount: 1100
  },
  {
    name: "Nike Air Jordan 1",
    category: "Sneaker",
    description: "Legendary basketball-inspired sneaker.",
    image: "https://via.placeholder.com/60",
    price: "$150.00",
    amount: 800
  },
  {
    name: "Adidas Terrex Swift R3",
    category: "Hiking",
    description: "Durable hiking shoe for rough terrain.",
    image: "https://via.placeholder.com/60",
    price: "$160.00",
    amount: 400
  },
  {
    name: "Salomon X Ultra 4",
    category: "Hiking",
    description: "Lightweight hiking shoe with great grip.",
    image: "https://via.placeholder.com/60",
    price: "$145.00",
    amount: 350
  },
  {
    name: "Mizuno Wave Rider",
    category: "Running",
    description: "Smooth ride with responsive cushioning.",
    image: "https://via.placeholder.com/60",
    price: "$125.00",
    amount: 500
  },
  {
    name: "Nike Vapor Edge Pro",
    category: "Football",
    description: "Football cleats built for agility.",
    image: "https://via.placeholder.com/60",
    price: "$190.00",
    amount: 320
  },
  {
    name: "Adidas Adipower Golf",
    category: "Golf",
    description: "Performance golf shoes with stability.",
    image: "https://via.placeholder.com/60",
    price: "$135.00",
    amount: 280
  },
  {
    name: "Nike Air Monarch IV",
    category: "Sneaker",
    description: "Comfortable everyday sneaker.",
    image: "https://via.placeholder.com/60",
    price: "$75.00",
    amount: 900
  },
  {
    name: "Under Armour Harper 6",
    category: "Baseball",
    description: "Durable cleats for baseball players.",
    image: "https://via.placeholder.com/60",
    price: "$150.00",
    amount: 220
  },
  {
    name: "Nike Force Trout 7",
    category: "Baseball",
    description: "Baseball cleats designed for speed and traction.",
    image: "https://via.placeholder.com/60",
    price: "$160.00",
    amount: 250
  },
  {
    name: "Columbia Newton Ridge",
    category: "Hiking",
    description: "Waterproof hiking boots for outdoor adventures.",
    image: "https://via.placeholder.com/60",
    price: "$120.00",
    amount: 380
  }
];

const categoryList = [
  { label: "Sneakers", key: "Sneaker" },
  { label: "Runners", key: "Running" },
  { label: "Golf", key: "Golf" },
  { label: "Hiking", key: "Hiking" },
  { label: "Football", key: "Football" },
  { label: "Baseball", key: "Baseball" }
];

// Track selected categories
const selectedCategories = new Map();
const categoryButtons = new Map();
categoryList.forEach(cat => selectedCategories.set(cat, false));

// Grid system (what’s currently displayed)
let gridSystem = [];
let pageIndex = 1;
const itemsPerPage = 9;

// -----------------------------
// Item
// -----------------------------

// Create a product item object
function createItem(name, category, description, image, price, amount) {
  return {
    name: name || "Unnamed Product",
    category: category || "Uncategorized",
    description: description || "No description available.",
    image: image || "https://via.placeholder.com/60",
    price: price || "$0.00",
    amount: amount || 0
  };
}

// Render a single product card
function renderItem(item) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-header">
      <img src="${item.image}" alt="${item.name}" />
      <div class="info">
        <h3>${item.name}</h3>
        <div class="category">${item.category}</div>
        <div class="price">${item.price}</div>
      </div>
    </div>
    <div class="product-description">${item.description}</div>
    <div class="product-stats">
      <div>Sales: ${item.amount}</div>
      <div>Remaining: ${item.amount}</div>
    </div>
  `;
  return card;
}

// -----------------------------
// Grid
// -----------------------------

// Add item to grid
function addToGrid(item) {
    refreshCategoryCounts();
    gridSystem.push(item);
}

// Remove item from grid by index
function removeFromGrid(index) {
    if (index >= 0 && index < gridSystem.length) {
        gridSystem.splice(index, 1);
        refreshCategoryCounts();
    }
}

// Filter items based on categories
function filterItems() {
    const activeCategories = Array.from(selectedCategories.entries())
        .filter(([_, isSelected]) => isSelected)
        .map(([cat]) => cat);

    let filtered;

    if (activeCategories.length === 0) {
        // No category selected: show all items
        filtered = sampleData;
    } else {
        // Filter by selected categories
        filtered = sampleData.filter(item => activeCategories.includes(item.category));
    }

    // Update gridSystem and render
    gridSystem = filtered.slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage);
    renderGrid();

    // Update pagination bar based on filtered items
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    renderPaginationBar(totalPages);
}

function renderGrid() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";

    gridSystem.forEach(item => {
        grid.appendChild(renderItem(item));  // <-- this is where items are rendered
    });
}

// Go to a specific page
function goToPage(page) {
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    pageIndex = page;

    // Slice data for current page
    const start = (pageIndex - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    gridSystem = sampleData.slice(start, end);

    renderGrid();
    renderPaginationBar(totalPages);
}

// Render pagination bar
function renderPaginationBar(totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    // Previous button
    if (pageIndex > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.className = "page-btn";
        prevBtn.textContent = "Previous";
        prevBtn.addEventListener("click", () => goToPage(pageIndex - 1));
        pagination.appendChild(prevBtn);
    }

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn";
        if (i === pageIndex) btn.classList.add("active");
        btn.textContent = i;
        btn.addEventListener("click", () => goToPage(i));
        pagination.appendChild(btn);
    }

    // Next button
    if (pageIndex < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.className = "page-btn";
        nextBtn.textContent = "Next";
        nextBtn.addEventListener("click", () => goToPage(pageIndex + 1));
        pagination.appendChild(nextBtn);
    }
}

// -----------------------------
// Category on sidebar
// -----------------------------

function updateCategoryCounts(items) {
    categoryList.forEach(({ key }) => {
        const btn = document.querySelector(`.category-count[data-cat="${key}"]`);
        if (btn) btn.textContent = "0";
    });

    items.forEach(item => {
        const btn = document.querySelector(`.category-count[data-cat="${item.category}"]`);
        if (btn) {
        const currentCount = parseInt(btn.textContent, 10) || 0;
        btn.textContent = currentCount + 1;
        }
    });
}

function refreshCategoryCounts() {
    updateCategoryCounts(sampleData);
}

function createCategoryButton({ label, key }) {
    const container = document.createElement("div");
    container.className = "category-button";
    container.setAttribute("data-cat", key);

    const nameSpan = document.createElement("span");
    nameSpan.textContent = label;

    const countBtn = document.createElement("button");
    countBtn.className = "category-count";
    countBtn.textContent = "0";
    countBtn.setAttribute("data-cat", key);

    // Entire container is clickable
    container.addEventListener("click", () => {
        const current = selectedCategories.get(key);
        selectedCategories.set(key, !current);

        // Remove all highlights
        document.querySelectorAll(".category-count").forEach(btn => {
        btn.classList.remove("active");
        });

        // Highlight selected ones
        selectedCategories.forEach((isSelected, cat) => {
        const btn = document.querySelector(`.category-count[data-cat="${cat}"]`);
        if (btn && isSelected) {
            btn.classList.add("active");
        }
        });

        // Filter and update pagination
        filterItems();
    });

    container.appendChild(nameSpan);
    container.appendChild(countBtn);
    return container;
}

function renderCategoryBar() {
    const sidebar = document.querySelector(".sidebar");
    const section = document.createElement("div");
    section.className = "category-section";

    const title = document.createElement("h2");
    title.textContent = "Categories";
    section.appendChild(title);

    categoryList.forEach(cat => {
        section.appendChild(createCategoryButton(cat));
    });

    sidebar.appendChild(section);

    // Update counts after buttons are created
    updateCategoryCounts(sampleData);
}


// -----------------------------
// Initialize
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryBar();
  refreshCategoryCounts();
  filterItems(); // ensures all items are shown by default
  renderPaginationBar(Math.ceil(sampleData.length / itemsPerPage));
});