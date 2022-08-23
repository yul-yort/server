/** Широта */
export type TLocalityLatitude = string;
/** Долгота */
export type TLocalityLongitude = string;

export class CreateLocalityDto {
  name: string;
  description?: string;
  region?: string;
  district?: string;
  coordinates?: [TLocalityLatitude, TLocalityLongitude]
}