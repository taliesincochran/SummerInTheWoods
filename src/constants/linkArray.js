import * as React from "react";
import * as routes from './routes';

const linkArray = [
  {
    path: routes.HOME, 
    text: "Home",
    admin: true,
    auth: true,
    nonAuth: true
  },
  {
    path: routes.APPLY,
    text: 'Apply',
    nonAuth:true
  },
  {
    path: routes.CONTACT,
    text: 'Contact Us',
    auth: true,
    nonAuth:true
  },
  {
    path: routes.CALENDAR,
    text: 'Calendar',
    admin: true,
    auth: true,
    nonAuth: true
  },
  {
    path: routes.Admin,
    text: 'Admin',
    nonAuth:true,
    admin:true,
    auth:true
  }
]
export default linkArray;