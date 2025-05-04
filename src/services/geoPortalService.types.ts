export interface DroneRestrictionAttributes {
  zone_name_de?: string | null;
  zone_name_fr?: string | null;
  zone_name_it?: string | null;
  zone_name_en?: string | null;
  zone_restriction_id?: string | null;
  zone_reason_id?: string | null;
  zone_restriction_de?: string | null;
  zone_restriction_fr?: string | null;
  zone_restriction_it?: string | null;
  zone_restriction_en?: string | null;
  zone_message_de?: string | null;
  zone_message_fr?: string | null;
  zone_message_it?: string | null;
  zone_message_en?: string | null;
  auth_url_de?: string[] | null;
  auth_url_fr?: string[] | null;
  auth_url_it?: string[] | null;
  auth_url_en?: string[] | null;
  auth_name_de?: string[] | null;
  auth_name_fr?: string[] | null;
  auth_name_it?: string[] | null;
  auth_name_en?: string[] | null;
  auth_contact?: string[] | null;
  auth_service_de?: string[] | null;
  auth_service_fr?: string[] | null;
  auth_service_it?: string[] | null;
  auth_service_en?: string[] | null;
  auth_email?: string[] | null;
  auth_phone?: string[] | null;
  auth_intervalbefore?: string | null;
  air_vol_lower_vref?: string | null;
  air_vol_lower_limit?: string | null;
  air_vol_upper_vref?: string | null;
  air_vol_upper_limit?: string | null;
  time_permanent?: string | null;
  time_start?: string | null;
  time_end?: string | null;
  period_day?: string | null;
  period_start?: string | null;
  period_end?: string | null;
}

export interface PopulationDensityAttributes {
  number?: number | null;
  i_year?: number | null;
  reli?: number | null;
  label?: number | null;
}

interface ResultItem<T> {
  layerBodId?: string;
  layerName?: string;
  featureId?: number;
  id?: number;
  label?: number | null;
  attributes?: T;
}

export interface GeoApiResponse<T> {
  results?: ResultItem<T>[];
  detail?: string;
  status?: string;
  code?: number;
}
