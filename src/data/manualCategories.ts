export interface ManualCategory {
  id: string;
  icon: string;
  labelKey: string;
  items: ManualItem[];
}

export interface ManualItem {
  id: string;
  icon: string;
  labelKey: string;
  material: string;
}

export const MANUAL_CATEGORIES: ManualCategory[] = [
  {
    id: 'food',
    icon: '🥦',
    labelKey: 'catFood',
    items: [
      { id: 'fruit_veg', icon: '🍎', labelKey: 'itemFruitVeg', material: 'organic' },
      { id: 'cooked_food', icon: '🍲', labelKey: 'itemCookedFood', material: 'food_waste' },
      { id: 'coffee_grounds', icon: '☕', labelKey: 'itemCoffeeGrounds', material: 'organic' },
      { id: 'eggshells', icon: '🥚', labelKey: 'itemEggshells', material: 'organic' },
      { id: 'bread', icon: '🍞', labelKey: 'itemBread', material: 'organic' },
    ],
  },
  {
    id: 'paper',
    icon: '📄',
    labelKey: 'catPaper',
    items: [
      { id: 'newspaper', icon: '📰', labelKey: 'itemNewspaper', material: 'newspaper' },
      { id: 'cardboard', icon: '📦', labelKey: 'itemCardboard', material: 'cardboard' },
      { id: 'magazine', icon: '📖', labelKey: 'itemMagazine', material: 'magazine' },
      { id: 'paper_bag', icon: '🛍️', labelKey: 'itemPaperBag', material: 'paper' },
      { id: 'pizza_box', icon: '🍕', labelKey: 'itemPizzaBox', material: 'cardboard' },
    ],
  },
  {
    id: 'plastic',
    icon: '🧴',
    labelKey: 'catPlastic',
    items: [
      { id: 'plastic_bottle', icon: '🍶', labelKey: 'itemPlasticBottle', material: 'plastic_bottle' },
      { id: 'plastic_bag', icon: '🛍️', labelKey: 'itemPlasticBag', material: 'plastic_bag' },
      { id: 'yogurt_cup', icon: '🥛', labelKey: 'itemYogurtCup', material: 'plastic_cup' },
      { id: 'shampoo_bottle', icon: '🧴', labelKey: 'itemShampooBottle', material: 'plastic_bottle' },
      { id: 'plastic_film', icon: '🎞️', labelKey: 'itemPlasticFilm', material: 'plastic_film' },
      { id: 'styrofoam', icon: '📦', labelKey: 'itemStyrofoam', material: 'styrofoam' },
    ],
  },
  {
    id: 'glass',
    icon: '🍾',
    labelKey: 'catGlass',
    items: [
      { id: 'wine_bottle', icon: '🍷', labelKey: 'itemWineBottle', material: 'glass_green' },
      { id: 'beer_bottle', icon: '🍺', labelKey: 'itemBeerBottle', material: 'glass_brown' },
      { id: 'jam_jar', icon: '🫙', labelKey: 'itemJamJar', material: 'glass_white' },
      { id: 'sauce_bottle', icon: '🍶', labelKey: 'itemSauceBottle', material: 'glass_green' },
      { id: 'broken_glass', icon: '💔', labelKey: 'itemBrokenGlass', material: 'restmuell' },
    ],
  },
  {
    id: 'metal',
    icon: '🥫',
    labelKey: 'catMetal',
    items: [
      { id: 'drinks_can', icon: '🥤', labelKey: 'itemDrinksCan', material: 'metal_can' },
      { id: 'food_can', icon: '🥫', labelKey: 'itemFoodCan', material: 'metal_can' },
      { id: 'aluminium_foil', icon: '✨', labelKey: 'itemAluminiumFoil', material: 'metal_foil' },
      { id: 'bottle_cap', icon: '🔩', labelKey: 'itemBottleCap', material: 'metal_tin' },
    ],
  },
  {
    id: 'hazardous',
    icon: '⚠️',
    labelKey: 'catHazardous',
    items: [
      { id: 'battery', icon: '🔋', labelKey: 'itemBattery', material: 'battery' },
      { id: 'electronics', icon: '📱', labelKey: 'itemElectronics', material: 'electronics' },
      { id: 'light_bulb', icon: '💡', labelKey: 'itemLightBulb', material: 'electronics' },
      { id: 'paint', icon: '🎨', labelKey: 'itemPaint', material: 'sondermuell' },
      { id: 'medication', icon: '💊', labelKey: 'itemMedication', material: 'sondermuell' },
    ],
  },
  {
    id: 'other',
    icon: '🗑️',
    labelKey: 'catOther',
    items: [
      { id: 'nappies', icon: '👶', labelKey: 'itemNappies', material: 'nappies' },
      { id: 'cigarette', icon: '🚬', labelKey: 'itemCigarette', material: 'cigarette' },
      { id: 'ceramics', icon: '🏺', labelKey: 'itemCeramics', material: 'ceramics' },
      { id: 'clothing', icon: '👕', labelKey: 'itemClothing', material: 'wertstoffhof' },
      { id: 'shoes', icon: '👟', labelKey: 'itemShoes', material: 'wertstoffhof' },
      { id: 'tetrapak', icon: '🥛', labelKey: 'itemTetrapak', material: 'composite' },
    ],
  },
];