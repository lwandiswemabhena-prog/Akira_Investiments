export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  moq: string;
  size: string;
  category: 'spice' | 'bag' | 'dairy' | 'other';
  image: string;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';
  stockQuantity?: number;
  brand?: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Braai & Grill Spicy BBQ Seasoning',
    description: 'Premium spicy BBQ seasoning blend perfect for grilled beef, chicken, lamb and traditional dishes. Enhanced flavour for every braai occasion.',
    shortDescription: 'Spicy BBQ seasoning blend.',
    price: 75,
    moq: '10 units',
    size: '200g',
    category: 'spice',
    brand: 'Robertsons',
    image: '/src/assets/seasonings/braai-grill.png',
    stockStatus: 'IN_STOCK',
    stockQuantity: 25
  },
  {
    id: 'p2',
    name: 'Six Gun Grill Seasoning',
    description: 'A flavoursome spice ideal for grilled beef, chicken, lamb as well as potatoes, mince and stews. Every meal\'s best friend.',
    shortDescription: 'Versatile grill seasoning.',
    price: 65,
    moq: '10 units',
    size: '200g',
    category: 'spice',
    brand: 'Crown National',
    image: '/src/assets/seasonings/six-gun.png',
    stockStatus: 'IN_STOCK',
    stockQuantity: 30
  },
  {
    id: 'p3',
    name: 'Seven Colours Grill Seasoning',
    description: 'Your everyday, every meal spice blend. Perfect for all occasions with a balanced mix of flavours for traditional cooking.',
    shortDescription: 'All-purpose grill seasoning.',
    price: 60,
    moq: '10 units',
    size: '200g',
    category: 'spice',
    brand: 'Seven Colours',
    image: '/src/assets/seasonings/seven-colours.png',
    stockStatus: 'IN_STOCK',
    stockQuantity: 20
  },
  {
    id: 'p4',
    name: 'Nandos Seasoning',
    description: 'All-in-one seasoning for your daily cooking needs. Perfect for spicing up any meal with authentic flavour.',
    shortDescription: 'Daily cooking seasoning.',
    price: 55,
    moq: '10 units',
    size: '200g',
    category: 'spice',
    brand: "Nando's",
    image: '/src/assets/seasonings/nandos.png',
    stockStatus: 'LOW_STOCK',
    stockQuantity: 3
  },
  {
    id: 'b1',
    name: 'Taxi Bags - NRCS Approved',
    description: 'High quality taxi bags, NRCS approved. Strong and durable, featuring the classic yellow and brown check pattern.',
    shortDescription: 'Classic patterned taxi bags.',
    price: 350,
    moq: '5 units',
    size: 'Standard',
    category: 'bag',
    image: '/src/assets/bags/taxi-bags.png',
    stockStatus: 'IN_STOCK',
    stockQuantity: 15
  },
  {
    id: 'b2',
    name: 'Heavy Duty Blue Plastic Bags',
    description: 'Durable blue plastic bags perfect for heavy duty refuse or packaging needs. Reliable and tear-resistant.',
    shortDescription: 'Blue plastic refuse/packaging bags.',
    price: 120,
    moq: '10 units',
    size: 'Standard',
    category: 'bag',
    image: '/src/assets/bags/plastic-bags.svg',
    stockStatus: 'IN_STOCK',
    stockQuantity: 20
  },
  {
    id: 'b3',
    name: 'U-Pak Super Strong Bread Bags',
    description: 'U-Pak Super Strong Bread Bags. Size 230 x 430mm. Comes in packs of 500. Ideal for bakery and commercial use.',
    shortDescription: 'Super strong bread bags.',
    price: 85,
    moq: '5 units',
    size: '500 pack',
    category: 'bag',
    brand: 'U-Pak',
    image: '/src/assets/bags/bread-bags.svg',
    stockStatus: 'IN_STOCK',
    stockQuantity: 30
  },
  {
    id: 'd1',
    name: 'Full Cream Maas - Extra Large',
    description: 'Premium quality full cream maas, perfect for retail and wholesale distribution. Rich, creamy texture with authentic taste.',
    shortDescription: 'Full cream dairy product.',
    price: 85,
    moq: '5 units',
    size: '4kg',
    category: 'dairy',
    image: '/src/assets/dairy/maas-large.svg',
    stockStatus: 'IN_STOCK',
    stockQuantity: 12
  },
  {
    id: 'd2',
    name: 'Full Cream Maas - Large',
    description: 'Premium quality full cream maas for households and businesses. Authentic taste and quality guaranteed.',
    shortDescription: 'Full cream dairy product.',
    price: 65,
    moq: '5 units',
    size: '2kg',
    category: 'dairy',
    image: '/src/assets/dairy/maas-medium.svg',
    stockStatus: 'IN_STOCK',
    stockQuantity: 18
  },
  {
    id: 'd3',
    name: 'Full Cream Maas - Medium',
    description: 'Premium quality full cream maas in convenient medium size. Perfect for families and small businesses.',
    shortDescription: 'Full cream dairy product.',
    price: 45,
    moq: '5 units',
    size: '1kg',
    category: 'dairy',
    image: '/src/assets/dairy/maas-small.svg',
    stockStatus: 'OUT_OF_STOCK',
    stockQuantity: 0
  }
];
