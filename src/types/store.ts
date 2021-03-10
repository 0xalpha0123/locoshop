export type StoreType = {
  address_components: any[];
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
    location_type: string;
    viewport: {
      east: number;
      north: number;
      south: number;
      west: number;
    };
  };
  name: string;
  owner_uid: string;
  place_id: string;
  types: string[];
  ride: {
    distance: {
      text: string;
      value: number;
    };
    duration: {
      text: string;
      value: number;
    }
  };
};
