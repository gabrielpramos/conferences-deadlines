export type FiltersGroup = { total: number } & {
  [x: string]: { [y: string]: number };
};

export type FiltersAreas = {
  [x: string]: string[];
};

export enum FilterCategories {
  Search = 'q',
  GreatArea = 'greatArea',
  Area = 'area',
}
export type FilterType = {
  [x: string]: string;
};

export type ServerFilterObject = {
  filterAreasList: FiltersAreas;
  filterCounts: FiltersGroup;
};
