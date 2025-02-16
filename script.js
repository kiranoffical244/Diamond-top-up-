const diamonds = [
    { name: "25 Diamonds", basePrice: 30 },
    { name: "50 Diamonds", basePrice: 55 },
    { name: "115 Diamonds", basePrice: 95 },
    { name: "240 Diamonds", basePrice: 195 },
    { name: "610 Diamonds", basePrice: 485 },
    { name: "1090 Diamonds", basePrice: 900 },
    { name: "1240 Diamonds", basePrice: 990 },
    { name: "1595 Diamonds", basePrice: 1265 },
    { name: "2090 Diamonds", basePrice: 1685 },
    { name: "2530 Diamonds", basePrice: 2030 },
    { name: "5060 Diamonds", basePrice: 3990 },
    { name: "10120 Diamonds", basePrice: 7180 }
];

const memberships = [
    { name: "Weekly Pass", basePrice: 195 },
    { name: "Monthly Pass", basePrice: 980 },
    { name: "Level Up Pass", basePrice: 195 },
    { name: "Evo Access 3 Days", basePrice: 150 },
    { name: "Evo Access 7 Days", basePrice: 250 },
    { name: "Evo Access 30 Days", basePrice: 650 },
    { name: "Weekly Lite", basePrice: 120 },
    { name: "Airdrop (0.35$ - 1.12$)", basePrice: 200 },
    { name: "Airdrop (1.8$ - 2.22$)", basePrice: 380 }
];

const container = document.getElementById("diamond-container");
const membershipContainer = document.getElementById("membership-container");
let selectedItems = [];

// Price increase rule (Above 100, increase by 5%)
function calculatePrice(price) {
    return price > 100 ? Math.ceil(price * 1.05) : price;
}

// Load items dynamically
function addItems(items, container) {
    items.forEach(item => {
        let finalPrice = calculatePrice(item.basePrice);
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `<strong>${item.name}</strong><br>Rupees ${finalPrice}`;
        div.onclick = () => toggleSelection(div, item.name, finalPrice);
        container.appendChild(div);
    });
}

// Select or unselect item
function toggleSelection(div, name, price) {
    if (selectedItems.some(item => item.name === name)) {
        selectedItems = selectedItems.filter(item => item.name !== name);
        div.classList.remove("selected");
    } else {
        selectedItems.push({ name, price });
        div.classList.add("selected");
    }

    document.getElementById("buy-button").style.display = selectedItems.length > 0 ? "block" : "none";
}

// Send message to WhatsApp when clicking "Buy Now"
function buyNow() {
    if (selectedItems.length === 0) return;
    
    const phoneNumber = "9762596912";
    let message = "✅ *I want to buy the following items:* \n\n";
    
    selectedItems.forEach(item => {
        message += `👉 ${item.name} - Rupees ${item.price}\n`;
    });

    message += "\nPlease provide me with more details. 🙏";

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// Load data
addItems(diamonds, container);
addItems(memberships, membershipContainer);