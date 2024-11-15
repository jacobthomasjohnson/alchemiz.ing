
# Alchemiz.ing

**Alchemiz.ing** is an incremental potion-crafting game where players gather resources, craft potions, manage their inventory, and level up to unlock powerful alchemical items and upgrades. Dive into the world of alchemy and see how far you can take your skills!

---

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Gameplay](#gameplay)
- [Data Structure](#data-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Resource Gathering**: Collect resources like herbs, water, and mana leaves, each with unique energy costs and experience rewards.
- **Potion Crafting**: Combine gathered resources to create potions and items, each with their own buffs and abilities.
- **Leveling System**: Gain experience by gathering resources and crafting, leveling up to unlock new resources, recipes, and upgrades.
- **Energy Management**: Track energy usage as you gather resources, with a passive regeneration system.
- **Upgradeable Income Rate**: Increase your currency-gain rate with upgrades that boost resource gathering and crafting efficiency.
- **Inventory System**: Store and manage crafted items, resources, and inventory capacity.
- **Tooltip Integration**: View detailed information about each item with a hover-over tooltip system.

---

## Getting Started

### Prerequisites
To run this project locally, you’ll need:
- **Node.js** (version 14+)
- **npm** (version 7+)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/alchemiz.ing.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd alchemiz.ing
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The game should now be running on `http://localhost:3000`.

---

## Gameplay

### Resource Gathering
Click on resources in the **Gather Panel** to spend energy and gather items. Each resource has a unique energy cost and provides experience points to help you level up. Resources become available based on your level.

### Crafting Potions
Use the **Crafting Panel** to combine resources and create potions. Each crafted item has its own requirements and provides buffs or boosts when created. Higher-level items require more resources and energy but yield more rewards.

### Leveling and Upgrades
Gaining experience through gathering and crafting will help you level up. Each level unlocks new resources and crafting recipes. Additionally, upgrade options appear as you level up, allowing you to increase your currency gain rate, reduce energy costs, and more.

### Energy Management
Energy is required for gathering resources. It passively regenerates over time, and upgrades can boost the rate of energy regeneration.

### Currency and Income Rate
Currency represents the funds collected in-game. The **income rate** determines how much currency is earned per second, automatically increasing based on upgrades. Currency can be used to purchase upgrades that further boost your gathering efficiency and income.

---

## Data Structure

Key components of *Alchemiz.ing* include:

- **Resources**: Each resource has an `energyCost`, `price`, and `requiredLevel`.
- **Crafting Items**: Each item has `requirements` (resource quantities), `cost`, `requiredLevel`, and `buffs`.
- **Upgrades**: Each upgrade has a `cost`, `requiredLevel`, and specific `effect` (e.g., `resourceBonus`, `incomeMultiplier`).
- **Player Stats**: Includes `currency`, `energy`, `experience`, `level`, `currencyGain`, and `energyGain`.

---

## Technologies Used

- **Next.js** for the framework
- **React** for UI components
- **Zustand** for global state management
- **TailwindCSS** for styling
- **Howler.js** for audio (optional feature if sound effects are added)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the project**
2. **Create your feature branch**: `git checkout -b feature/new-feature`
3. **Commit your changes**: `git commit -m 'Add new feature'`
4. **Push to the branch**: `git push origin feature/new-feature`
5. **Open a pull request`

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
