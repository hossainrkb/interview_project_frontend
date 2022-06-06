import { useState, useEffect } from "react";
import { index, destroy } from "../service/offerService";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Common/Navbar.Component";
const Offer = () => {
  let { id } = useParams();
  const [List, setList] = useState([]);
  const [partnerData, setpartnerData] = useState({});
  useEffect(() => {
    (async () => {
      let response = await index(id);
      let { data: responseData } = response;
      if (responseData.status && responseData.status == "ok") {
        console.log(responseData);
        let { offers } = responseData.data;
        let { partner } = responseData.data;
        setList(offers);
        setpartnerData(partner);
      }
    })();
  }, []);

  const destroyPartner = async (id) => {
    if (!window.confirm("Are You Sure ?")) return;
    let response = await destroy(id);
    let { data: responseData } = response;
    if (responseData.status && responseData.status == "ok") {
      let newList = List.filter((e) => e.id != id);
      setList(newList);
    }
  };
  const destroyoffer = async (id) => {
    if(!window.confirm('Are You Sure ?'))return;
    let response = await destroy(id);
    let { data: responseData } = response;
    if (responseData.status && responseData.status == "ok") {
      let newList = List.filter((e) => e.id != id);
      setList(newList);
    }
  };
  return (
    <>
      <Navbar />
      <h1>Offer List for : {partnerData.name}</h1>
      <NavLink
        className="navbar-brand"
        to={`/partner/${partnerData.id}/offers/create`}
      >
        Offer Add
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <td>SL</td>
            <td>Name</td>
            <td>Percentage</td>
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {List.length > 0
            ? List.map((e, index) => {
                return (
                  <tr key={e.id}>
                    <td>{++index}</td>
                    <td>{e.name}</td>
                    <td>{e.percentage}</td>
                    <td>
                      <img src={e.offer_url} width="80px" />
                    </td>
                    <td>
                      <NavLink
                        className="btn-primary btn btn-sm"
                        to={`/offer/${e.id}/edit`}
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

export default Offer;
