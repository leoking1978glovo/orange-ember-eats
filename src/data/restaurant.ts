import carneCriolla from "@/assets/Carne-en-salsa-criolla.jpg";
import sancochodegallina from "@/assets/dish-sancocho-de-gallina.jpg";
import maduroconqueso from "@/assets/dish-maduro-con-queso.jpg";
import tamalcolombiano from "@/assets/dish-tamal-colombiano.jpg";
import bandejapaisa from "@/assets/dish-bandeja-paisa.jpg";

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
    name: "Sancocho de gallila",
    description: "trozos de gallina criolla, plátano verde, yuca, mazorca (choclo) y papa, cocinados en un caldo aromático con ajo, cebolla y cilantro.",
    price: "12,00 €",
    image: sancochodegallina,
  },
  {
    name: "maduro con queso",
    description: "plato tradicional latinoamericano que combina el dulzor intenso del plátano macho cocido con la nota salada y textura fundente del queso.",
    price: "16,90 €",
    image: maduroconqueso,
  },
  {
    name: "tamal colombiano",
    description: "carnes de cerdo y pollo, papa y arvejas, sin llevar arroz.",
    price: "8,50 €",
    image: tamalcolombiano,
  },
  {
    name: "Bndeja Paisa",
    description: "PLato colombiano que lleva, arroz blanco, carne moida, chicharron, chorizo, huevo frito, platano maduro, aguacate, arepa.",
    price: "7,90 €",
    image: bandejapaisa,
  },
];

export type MenuCategory = {
  title: string;
  items: { name: string; description: string; price: string }[];
};

export const menu: MenuCategory[] = [
  {
    title: "Desayunos",
    items: [
      { name: "Calentado con chicharrón, arepa y queso", description: "", price: "10.00 €" },
      { name: "Calentado con chorizo, arepa y queso", description: "", price: "8.00 €" },
      { name: "Calentado con huevos pericos, arepa y queso", description: "", price: "7.00 €" },
      { name: "Chorizo, huevos pericos, arepa y queso", description: "", price: "6.50 €" },
      { name: "Morcilla con arepa", description: "", price: "8.00 €" },
      { name: "Huevos pericos, arepa y queso", description: "", price: "5.50 €" },
      { name: "Pandebono", description: "", price: "1.60 €" },
    ],
  },
  {
    title: "Adicionales",
    items: [
      { name: "Chorizo", description: "", price: "1.50 €" },
      { name: "Huevos pericos", description: "", price: "2.50 €" },
      { name: "Huevos fritos", description: "", price: "1.00 €" },
      { name: "Aguacate", description: "", price: "1.00 €" },
      { name: "Arepa tela", description: "", price: "1.20 €" },
      { name: "Arepa pequeña", description: "", price: "0.60 €" },
    ],
  },
  {
    title: "Menú del día",
    items: [
      { name: "Arroz, frijoles, ensalada, papa a la francesa, sopa, proteína y bebida", description: "A elección y disponibilidad. Proteína: chicharrón, churrasco, costillas BBQ, pollo broster, cerdo o pollo a la plancha. Bebidas: coca cola, fanta, aquarius.", price: "12.00 €" },
      { name: "Menú infantil", description: "Pollo broster o nuggets (a elección y/o disponibilidad), papa francesa y helado.", price: "8.00 €" },
    ],
  },
  {
    title: "A la carta",
    items: [
      { name: "Bandeja paisa", description: "", price: "14.50 €" },
      { name: "Sobre barriga en salsa", description: "", price: "13.50 €" },
      { name: "Lengua en salsa", description: "", price: "13.50 €" },
      { name: "Pescado frito", description: "De acuerdo a tamaño.", price: "14.00 - 18.00 €" },
      { name: "Chuleta valluna", description: "", price: "13.50 €" },
      { name: "Ternera a la plancha o en bistec", description: "", price: "13.50 €" },
      { name: "Mondongo", description: "Viernes y sábados. Sopa de callo, trocios de corto y costilla, patata, yuca, zanahoria cocida.", price: "14.00 €" },
      { name: "Tamal", description: "Envuelto en hoja de bijao, masa adobada de maíz, zanahoria, patata, proteínas, pollo, costilla, chicharrón y cerdo + porción de arroz.", price: "10.00 €" },
    ],
  },
  {
    title: "Especialidad fin de semana",
    items: [
      { name: "Sancocho de gallina", description: "", price: "13.00 €" },
      { name: "Sancocho de costilla", description: "", price: "14.00 €" },
      { name: "Sancocho mixto", description: "", price: "15.00 €" },
    ],
  },
  {
    title: "Raciones / Porciones",
    items: [
      { name: "Chicharrón con arepa o patacón o papa frita", description: "", price: "8.00 €" },
      { name: "Churrasco con arepa o patacón o papa frita", description: "", price: "10.00 €" },
      { name: "Maduro con queso", description: "", price: "6.50 €" },
      { name: "Porción de ensalada", description: "", price: "3.00 €" },
      { name: "Porción de patatas", description: "", price: "3.00 €" },
      { name: "Porción de arroz", description: "", price: "2.50 €" },
      { name: "Porción de tajada maduro", description: "", price: "3.00 €" },
      { name: "Ají adicional", description: "", price: "1.00 €" },
    ],
  },
  {
    title: "Entradas y para compartir",
    items: [
      { name: "Empanadas", description: "", price: "1.80 €" },
      { name: "Patacones con guiso", description: "", price: "4.00 €" },
      { name: "Patacones con queso y guiso", description: "", price: "5.50 €" },
      { name: "Picada de chorizo, morcilla y papa vapor", description: "", price: "8.00 €" },
    ],
  },
  {
    title: "Bebidas y jugos naturales",
    items: [
      { name: "Café", description: "", price: "1.20 €" },
      { name: "Café con leche", description: "", price: "1.50 €" },
      { name: "Milo frío o caliente", description: "", price: "4.00 €" },
      { name: "Chocolate", description: "", price: "2.50 €" },
      { name: "Gaseosa manzana - uva - colombiana malta", description: "", price: "2.80 €" },
      { name: "Coca cola - fanta - aquarius", description: "", price: "2.30 €" },
      { name: "Borojó personal", description: "", price: "4.50 €" },
      { name: "Jugo natural agua personal", description: "", price: "3.50 €" },
      { name: "Jugo natural agua jarra", description: "", price: "6.00 €" },
      { name: "Jugo natural leche personal", description: "", price: "4.50 €" },
      { name: "Jugo natural leche jarra", description: "", price: "7.50 €" },
    ],
  },
  {
    title: "Cervezas",
    items: [
      { name: "Amstel botella", description: "", price: "2.50 €" },
      { name: "Heineken - Corona - Alhambra", description: "", price: "3.50 €" },
      { name: "Cerveza cero", description: "", price: "3.00 €" },
    ],
  },
];