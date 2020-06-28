export interface AppContents {
  main: LandingPageItems;
  footer: FooterLayout;
}

export interface LandingPageItems extends Array<LandingPageItem>{};

export interface LandingPageItem {
  type: 'webportal';
  id: string;
  title: string;
  url: string;
}

export interface FooterLayout extends Array<FooterItem>{};

export interface FooterItem {
  id: string;
  title: string;
}
