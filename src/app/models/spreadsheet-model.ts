export interface ConferenceInfo {
  AreaID: number;
  GreatArea: string;
  Area: string;
  ConferenceID: number;
  Conference: string;
  ConferenceDetail: string;
  Location: string;
  WebSite: string;
  ConferenceDates: string;
  DeadlineId: number;
  Order: number;
  Deadline: string;
  DeadlineTimeZone: string;
  DeadlineISO: string;
  Status: string;
  Detail: string;
  UpdatedAt: string;
}

export type ConferenceList = ConferenceInfo[];
