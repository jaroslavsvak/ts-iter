import { iter } from '../index';

const fridge = iter(['Butter', 'Bread roll', 'Egg', 'Sausage', 'Steak', 'Ham', 'Fries']);
const breakfast = ['Bread roll', 'Butter', 'Egg', 'Ham'];
const lunch = ['Vegetable soup', 'Steak', 'Fries', 'Salad'];
const snack = ['Apple'];
const dinner = ['Bread roll', 'Sausage'];

const eatToday = iter(breakfast).concat(lunch).concat(snack).concat(dinner);

const missingInFridge = eatToday.except(fridge);
console.log('Shopping list', missingInFridge.toArray());

const alreadyAtHome = eatToday.intersect(fridge);
console.log('We already have', alreadyAtHome.toArray());
