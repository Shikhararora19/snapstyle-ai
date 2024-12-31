export interface StyleItem {
    name: string;
    description: string;
    type: string;
    link: string;
    image: string;
  }
  
  export interface StyleRecommendation {
    occasion: string;
    items: StyleItem[];
  }
  