import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { SidebarLink } from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { ConfirmationModal } from "../../common/ConfirmationModal";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  if (authLoading || profileLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-auto min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user.accountType !== link.type) return null;
            return (
              <SidebarLink link={link} iconName={link.icon} key={link.id} />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};
