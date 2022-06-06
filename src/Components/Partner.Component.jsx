import { useState, useEffect } from "react";
import { index, destroy } from "../service/partnerService";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Common/Navbar.Component";
const Partner = () => {
  const [partnerList, setPartnerList] = useState([]);
  useEffect(() => {
    (async () => {
      let response = await index();
      let { data: responseData } = response;
      if (responseData.status && responseData.status == "ok") {
        setPartnerList(responseData.data);
      }
    })();
  }, []);

  const destroyPartner = async (id) => {
    if(!window.confirm('Are You Sure ?'))return;
    let response = await destroy(id);
    let { data: responseData } = response;
    if (responseData.status && responseData.status == "ok") {
      let newList = partnerList.filter((e) => e.id != id);
      setPartnerList(newList);
    }
  };
  return (
    <>
      <Navbar />
    <h2>Partner List</h2>
      <NavLink className="navbar-brand" to="/partner/create">
        Add
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <td>SL</td>
            <td>Name</td>
            <td>Location</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {partnerList.length > 0
            ? partnerList.map((e, index) => {
                return (
                  <tr key={e.id}>
                    <td>{++index}</td>
                    <td>{e.name}</td>
                    <td>{e.location}</td>
                    <td>
                      <NavLink
                        className="btn-primary btn btn-sm"
                        to={`/partner/${e.id}/edit`}
                      >
                        Edit
                      </NavLink>
                      <button
                        className="btn-danger btn btn-sm"
                        onClick={() => {
                          destroyPartner(e.id);
                        }}
                      >
                        Delete
                      </button>
                      <NavLink
                        className="btn-primary btn btn-sm"
                        to={`/partner/${e.id}/offers`}
                      >
                        Offers
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            : "No Record found"}
        </tbody>
      </table>
    </>
  );
};

export default Partner;
