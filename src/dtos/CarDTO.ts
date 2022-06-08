interface Accessories {
  name: string;
  type: string;
}

export interface CarDTO {
  about: string;
  accessories: Accessories[];
  brand: string;
  fuel_type: string;
  id: string;
  name: string;
  photos: string[];
  rent: {
    period: string;
    price: string;
  };
  thumbnail: string;
}
