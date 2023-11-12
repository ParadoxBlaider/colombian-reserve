

export interface DataType {
  key?: string;
  id: number;
  name: string;
  city: string;
  address: string;
  rooms: Rooms[];
  available_rooms: Rooms[];
  status: boolean;
}

export type Rooms = {
  id: number;
  key?: string;
  hotel: {
    id: number,
    name: string
  };
  number: number;
  base_price: number;
  location: string;
  type: string;
  tax: number;
  max_people: number;
  status: boolean;
}