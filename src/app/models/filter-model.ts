export type FiltersGroup = {
  [x: string]: { [y: string]: number };
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
  appliedGreatAreas: string[];
  appliedAreas: string[];
  filterTypes: FiltersGroup;
  search: string;
};
