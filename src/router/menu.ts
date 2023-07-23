export interface IMenu {
  route: string;
  name: string;
  title: string;
  public: boolean;
  private: boolean;
  auth: boolean;
}

export const Menu: IMenu[] = [
  { route: ' ', name: 'Home', title: 'Home', private: false, public: true, auth: false },
  { route: 'admin', name: 'Admin', title: 'Admin', private: true, public: false, auth: true },
  { route: 'login', name: 'Log In', title: 'Log In', private: false, public: true, auth: false },
  { route: 'logout', name: 'Log Out', title: 'Log Out', private: false, public: true, auth: true },
  { route: 'register', name: 'Register', title: 'Register', private: false, public: true, auth: false },
  { route: 'courses', name: 'Courses', title: 'Courses', private: false, public: true, auth: false },
  { route: 'marketplace', name: 'Marketplace', title: 'Marketplace', private: false, public: true, auth: false },
  { route: 'blogs', name: 'Blogs', title: 'Blogs', private: false, public: true, auth: false },
  { route: 'wishlist', name: 'Wishlist', title: 'Wishlist', private: false, public: true, auth: false },
];
