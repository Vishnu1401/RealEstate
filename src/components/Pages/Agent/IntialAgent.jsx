import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Buyer from '../Buyer/Buyer';
import { useState, useEffect } from 'react';
import '../Buyer/Buyer.css';
import axios from 'axios'
import './IntialAgent.css';

function IntialAgent() {
  const { roleid, username } = useParams();
  const [view, setView] = useState(false);
  const [properties, setProperties] = useState([]);
  const [propertyid, setPropertyId] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log(roleid);
        const response = await axios.get(`http://localhost:8080/agentproperties/${username}`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [count]);

  useEffect(() => {
    const deleteproperty = async () => {
      if (propertyid) {
        const response = await axios.delete(`http://localhost:8080/deleteproperty/${propertyid}`);
        if (response.data.success) {

          alert(response.data.success);
          setCount(count + 1);
        }
        else {
          alert(response.data.failed);
        }
      }
    };
    deleteproperty();
  }, [propertyid])

  return (
    <div className="intial-agent-container">
      <div className="button-group">
        <Link to={`/agent/${roleid}/${username}`} className="styled-button view-properties">Add Property</Link>
        <button className="styled-button view-properties" onClick={() => setView(true)}>All Properties</button>
        <button className="styled-button view-properties" onClick={() => setView(false)}>Your Properties</button>
      </div>
     <div className="container">
      {view ? (
        <div>{<Buyer />}</div>
      ) : (
        <div className="main">
          {properties && properties.length > 0 ? (
            <>
              <h2 className="title">Properties Added by You</h2>
              <div className="container" >

                {properties.map((property, index) => (
                  <div key={index} className="card" >
                    <div style={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                      <i className="bi bi-pencil-square" title='Edit' style={{ fontSize: "20px", color: "blue", cursor: "pointer" }} onClick={() => {
                        navigate(`/updateproperty/${property.id}`)
                      }}></i>
                      <i className="bi bi-trash " title='Delete' style={{ fontSize: "20px", color: "red", cursor: "pointer" }} onClick={() => {
                        setPropertyId(property.id);
                      }}></i>
                    </div>
                    {property.image && (
                      <img
                        src={`data:image/jpeg;base64,${property.image}`}
                        alt="Property"
                        className="property-image"
                        style={{width:"100%", height: "200px", objectFit: "fill", borderRadius: "10px" ,margin:"10px auto"}}
                      />
                    )}

                    {property.id && <p className="property-info"><strong>Property Id:</strong> {property.id}</p>}
                    {property.type && <p className="property-info"><strong>Property Type:</strong> {property.type}</p>}
                    {property.location && <p className="property-info"><strong>Location:</strong> {property.location}</p>}
                    {property.ownerName && <p className="property-info"><strong>Owner:</strong> {property.ownerName}</p>}
                    {property.ownerContact && <p className="property-info"><strong>Contact:</strong> {property.ownerContact}</p>}
                    {property.ownerEmail && <p className="property-info"><strong>Email:</strong> {property.ownerEmail}</p>}
                    {property.agentId && <p className="property-info"><strong>Agent ID:</strong> {property.agentId}</p>}

                    <Link to={`/moreinfo/${property.id}`} className="property-link">
                      Do you want to know more info?
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-properties">Properties are not available</div>
          )}
        </div>
      )}
        </div>
    </div>
  )
}

export default IntialAgent;
