import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

export default function Navigation({ isLoaded }) {
   const sessionUser = useSelector((state) => state.session.user);

   return (
      <ul>
         <li>
            <NavLink to="/">Home</NavLink>
         </li>
         {isLoaded && (
            <li>
               <ProfileButton user={sessionUser} />
            </li>
         )}
      </ul>
   );
}
