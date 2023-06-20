import { useEffect } from "react";
import useHome from "../../../hooks/useHome";
import HomeHeader from "../HomeHeader";
import ModalEditRegisterUser from "../ModalEditRegisterUser";
import SideBarNav from "../SideBarNav";
import api from '../../../services/api';
import "./style.css";
import { getItem } from "../../../utils/storage";

function Page({ children, validateSideBar, setValidateSideBar }) {
  const { isModalEditUser, updatedUser, setFormProfile } = useHome();

  async function getProfile() {

    try {
      const response = await api.get('/user', { headers: { Authorization: `Bearer ${getItem("token")}`, } });

      const user = { ...response.data };
      setFormProfile({ ...user });

    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    getProfile();
  }, [updatedUser])

  return (
    <div className="page-home flex-row bg-gray8">
      <SideBarNav validateSideBar={validateSideBar} setValidateSideBar={setValidateSideBar} />
      <div className="home-header flex-column">
        <HomeHeader validateSideBar={validateSideBar} />
        <div className="container-home margin-t-19">
          <div className="bp-pink">
            {children}
          </div>
          {isModalEditUser && <ModalEditRegisterUser />}
        </div>
      </div >
    </div >
  );
};

export default Page;