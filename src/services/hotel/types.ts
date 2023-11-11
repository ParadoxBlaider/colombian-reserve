

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

type Rooms = {
  id: number;
  number: number;
  base_price: number;
  tax: number;
  max_people: number;
  status: boolean;
}