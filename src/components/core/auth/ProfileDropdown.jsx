import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";

export const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsOpen(false));
  if (!user) return null;

  return (
    <button className="relative" onClick={() => setIsOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          className="aspect-square w-[30px] rounded-full object-cover"
          src={user.image}
          alt={`profile-${user.firstName}`}
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {isOpen && (
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
        >
          <Link to="/dashboard/my-profile">
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
};
