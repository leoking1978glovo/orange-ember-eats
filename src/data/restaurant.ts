import carneCriolla from "@/assets/Carne-en-salsa-criolla.jpg";
import tacos from "@/assets/dish-tacos.jpg";
import ramen from "@/assets/dish-ramen.jpg";
import fries from "@/assets/dish-fries.jpg";
import dessert from "@/assets/dish-dessert.jpg";

export type Dish = {
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
};

export const dishes: Dish[] = [
  {
    name: "Carne en salsa criolla",
    description: "Carne tierna cocinada lentamente en una sabrosa salsa criolla.",
    price: "14,50 €",
    image: carneCriolla,
  },
  
  {
    name: "Tacos Callejeros",
    description: "Trío de tacos de cochinita con pico de gallo y lima ahumada.",
    price: "12,00 €",
    image: tacos,
  },
  {
    name: "Ramen Fusión",
    description: "Caldo de 18 horas, aceite de chile y panceta glaseada.",
    price: "16,90 €",
    image: ramen,
    tag: "Popular",
  },
  {
    name: "Papas Cargadas",
    description: "Patatas crujientes con cheddar, jalapeños y chorizo picante.",
    price: "8,50 €",
    image: fries,
  },
  {
    name: "Volcán de Chocolate",
    description: "Coulant tibio con oro comestible y helado de vainilla bourbon.",
    price: "7,90 €",
    image: dessert,
    tag: "Popular",
  },
];

export type MenuCategory = {
  title: string;
  items: { name: string; description: string; price: string }[];
};

export const menu: MenuCategory[] = [
  {
    title: "Entrantes",
    items: [
      { name: "Croquetas de rabo", description: "Cremosas, con alioli de humo.", price: "9,00 €" },
      { name: "Alitas glaseadas", description: "Miel picante y sésamo negro.", price: "10,50 €" },
      { name: "Guacamole braseado", description: "Aguacate a la brasa y totopos.", price: "8,00 €" },
      { name: "Burrata urbana", description: "Tomate seco, albahaca y aceite verde.", price: "11,00 €" },
    ],
  },
  {
    title: "Principales",
    items: [
      { name: "Smash Brutal", description: "Doble carne y salsa secreta.", price: "14,50 €" },
      { name: "Ramen Fusión", description: "Caldo de 18 horas y panceta.", price: "16,90 €" },
      { name: "Costilla 12h", description: "Cocción lenta con barbacoa de café.", price: "18,50 €" },
      { name: "Bowl vegetal", description: "Quinoa, boniato y tahini de chile.", price: "13,00 €" },
    ],
  },
  {
    title: "Postres",
    items: [
      { name: "Volcán de chocolate", description: "Coulant tibio con oro.", price: "7,90 €" },
      { name: "Tarta de queso", description: "Horneada al estilo vasco.", price: "6,90 €" },
      { name: "Churros rebeldes", description: "Con dulce de leche salado.", price: "6,00 €" },
    ],
  },
  {
    title: "Bebidas",
    items: [
      { name: "Margarita ahumada", description: "Mezcal, lima y sal de gusano.", price: "10,00 €" },
      { name: "Vermut de barrio", description: "Rojo artesano con naranja.", price: "5,50 €" },
      { name: "Kombucha de mango", description: "Fermentada en casa.", price: "4,50 €" },
      { name: "Café tostado propio", description: "Espresso doble intenso.", price: "2,50 €" },
    ],
  },
];
