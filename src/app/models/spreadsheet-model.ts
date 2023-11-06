export enum SheetHeaderColumns {
  AreaID = 'AreaID',
  GreatArea = 'GreatArea',
  Area = 'Area',
  ConferenceID = 'ConferenceID',
  Conference = 'Conference',
  ConferenceDetail = 'ConferenceDetail',
  Location = 'Location',
  WebSite = 'WebSite',
  ConferenceDates = 'ConferenceDates',
  DeadlineId = 'DeadlineId',
  Order = 'Order',
  Deadline = 'Deadline',
  DeadlineTimeZone = 'DeadlineTimeZone',
  DeadlineISO = 'DeadlineISO',
  Status = 'Status',
  Detail = 'Detail',
  UpdatedAt = 'UpdatedAt',
}
export type ConferenceInfo = {
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
  DeadlineISO: Date;
  Status: string;
  Detail: string;
  UpdatedAt: string;
};

export type ConferencesList = ConferenceInfo[];

export type ConferenceArea = Pick<
  ConferenceInfo,
  'AreaID' | 'GreatArea' | 'Area'
>;

export type ConferenceAreaList = ConferenceArea[];
