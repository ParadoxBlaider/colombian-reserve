

export interface DataBookings {
  id: number;
  hotel_id: number;
  room_id: number;
  hotel: Hotels;
  room: Rooms;
  check_in_date: string;
  check_out_date: string;
  quatity_people: number;
  status: boolean;
  guests: Guests[];
  emergency_contact: EmergencyContact;
}

export interface Guests {
  name: string;
  last_name: string;
  birthdate: string;
  genre: string;
  type_document: string;
  document_number: string;
  email: string;
  cellphone: string;
}
export interface EmergencyContact {
  name: string;
  last_name: string;
  cellphone: string;
}

export interface Hotels {
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