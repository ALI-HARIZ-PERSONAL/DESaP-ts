export interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
  }
  
  export const NAV_ITEMS: Array<NavItem> = [
	{
	  label: "Home",
	  href: "/",
	},
	{
	  label: "Account",
	  children: [
		{
		  label: "View Account", // Changed from "Register Now" to "View Account"
		  subLabel: "View your community account details", // Updated subLabel
		  href: "/account/view", // Redirect to the View Account page
		},
	  ],
	}
  ];