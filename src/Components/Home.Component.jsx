import Navbar from "../Components/Common/Navbar.Component";
import {list } from "../service/offerService";
import { useState,useEffect } from "react";
const Home = () => {
  const [offerList, setofferList] = useState([]);
  useEffect(() => {
    (async () => {
      let response = await list();
      let { data: responseData } = response;
      if (responseData.status && responseData.status == "ok") {
        setofferList(responseData.offers);
      }
    })();
  }, []);
    return ( 
      <>
        <Navbar />
        <h2>Offer List</h2>
         <div className="row">
         {
            offerList.length>0?(
              offerList.map(e=>{
              return (  <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-info">
                  <div>Offer Name - {e.name}</div>
                  <div>Percentage - {e.percentage}%</div>
                </div>
                <div className="card-body">
                  <img src={e.offer_url} width="90px" />
                </div>
                <div className="card-footer">Partner-  {e.partner.name}</div>
              </div>
            </div>)
              })
            ):"No Record Found"
          }
         </div>
      </>
     );
}
 
export default Home;