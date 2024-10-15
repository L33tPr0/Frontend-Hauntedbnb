import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { createSelector } from "reselect";

const spotsSelector = createSelector(
   [(state) => state.session],
   (session) => session.user
);

export default function Navigation({ isLoaded }) {
   const sessionUser = useSelector(spotsSelector);
   console.log(sessionUser);
   return (
      <ul className="nav-box">
         <li>
            <NavLink to="/">
               <img
                  src="../../../public/Pixel-Paradises-Icon.png"
                  className="logo-image"
               />
            </NavLink>
         </li>
         {isLoaded && (
            <li>
               {sessionUser ? (
                  <NavLink to="/spots/new">Create a New Spot</NavLink>
               ) : null}
               <ProfileButton user={sessionUser} />
            </li>
         )}
      </ul>
   );
}
