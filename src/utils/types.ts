export interface Launch {
  id: number;
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    site_name: string;
  };
  links: {
    wikipedia: string;
  };
  launch_success: boolean;
}

export interface Launches {
  launches: Array<Launch>;
}

export interface LaunchDetailed {
  launch: {
    mission_name: string;
    launch_date_local: string;
    launch_site: {
      site_name: string;
    };
    links: {
      wikipedia: string;
      article_link: string;
    };
    launch_success: boolean;
    details: string;
    rocket: {
      rocket_name: string;
      rocket_type: string;
    };
  };
}