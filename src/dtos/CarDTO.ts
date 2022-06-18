export interface Photos {
  id: string;
  photo: string;
}

interface Accessories {
  id: string;
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
  photos: Photos[];
  period: string;
  price: string;
  thumbnail: string;
}
