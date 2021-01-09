
export type City = null | {
    Index: number;
    FID: number;
    City: string;
    State: string;
    overall_policing_budget: number;
    percent_city_funds_spent_on_policing: number;
    policing_budget_per_capita: number;
    police_dept_employee_to_resident_ratio: number;
    radius: number;
    cx: number;
    cy: number;
    latitude: number;
    longitude: number;
  };