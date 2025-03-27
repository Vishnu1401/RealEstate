import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import page6 from '../../../assets/page7.jpeg';
import '../Agent/IntialAgent.css';
import { ToastContainer, toast } from 'react-toastify';

function Buyer() {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viewproperty");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchUserid = async () => {
      try {
        const username = localStorage.getItem("user");
        const response = await axios.get(`http://localhost:8080/getuserid/${username}`);
        setUserid(response.data.success);
      } catch (error) {
        console.error("Error fetching Userid:", error);
      }
    };
    fetchUserid();
  }, []);

  const toggleFavorite = async (propertyId) => {
    if (!userid) {
      alert("User ID not found. Please log in.");
      return;
    }

    const isFavorited = favorites[propertyId];
    try {
      console.log("propertyId:", propertyId, "userid:", userid);
      if (isFavorited) {
        await axios.delete(`http://localhost:8080/deletefavorites/${userid}/${propertyId}`);
        toast.success('Removed from favorites');
      } else {
        await axios.post("http://localhost:8080/insertfavorites", {
          propertyid: propertyId,
          userid: userid
        });
        toast.success('Added to favorites');
      }
      setFavorites((prev) => ({ ...prev, [propertyId]: !prev[propertyId] }));
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
    <div className="container">
      
      <div style={styles.main}>
        {properties.length > 0 ? (
          <>
            <h2 style={styles.title}>Available Properties for Sale</h2>
            <div style={styles.container}>
              {properties.map((property) => (
                <div
                  key={property.id}
                  style={hoveredCard === property.id ? { ...styles.card, ...styles.cardHover } : styles.card}
                  onMouseEnter={() => setHoveredCard(property.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {property.image && (
                    <img
                      src={`data:image/jpeg;base64,${property.image}`}
                      alt="Property"
                      className="property-image"
                      style={styles.propertyImage}
                    />
                  )}
                  <p style={styles.propertyInfo}><strong>Property Id:</strong> {property.id}</p>
                  <p style={styles.propertyInfo}><strong>Property Type:</strong> {property.type}</p>
                  <p style={styles.propertyInfo}><strong>Location:</strong> {property.location}</p>
                  <p style={styles.propertyInfo}><strong>Owner:</strong> {property.ownerName}</p>
                  <p style={styles.propertyInfo}><strong>Contact:</strong> {property.ownerContact}</p>
                  <p style={styles.propertyInfo}><strong>Email:</strong> {property.ownerEmail}</p>
                  <p style={styles.propertyInfo}><strong>Agent ID:</strong> {property.agentId}</p>

                  <div style={styles.buttonContainer}>
                    <button style={styles.buyButton}>Buy Now</button>
                    <i
                      className={`bi ${favorites[property.id] ? "bi-heart-fill" : "bi-heart"}`}
                      style={{
                        ...styles.favIcon,
                        background: favorites[property.id] ? "#ff4d4d" : "#ccc",
                        color: favorites[property.id] ? "white" : "black",
                      }}
                      onClick={() => toggleFavorite(property.id)}
                    ></i>
                  </div>
                  <Link
                    to={`/moreinfo/${property.id}`}
                    style={hoveredLink === property.id ? { ...styles.propertyLink, ...styles.propertyLinkHovered } : styles.propertyLink}
                    onMouseEnter={() => setHoveredLink(property.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Do you want to know more info?
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={styles.noProperties}>Properties are not available</div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Buyer;

const styles = {
  main: { 
    width: "90%",
    margin: "10px auto", 
    padding: "20px", 
    textAlign: "center" 
  },
  title: { 
    fontSize: "28px", 
    fontWeight: "900", 
    color: "rgba(216, 21, 21, 0.7)", 
    marginBottom: "40px" 
  },
  container: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
    gap: "20px" 
  },
  card: { 
    backgroundColor: "white", 
    padding: "20px", 
    borderRadius: "8px", 
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)", 
    textAlign: "center", 
    transition: "transform 0.3s, box-shadow 0.3s" 
  },
  cardHover: { 
    transform: "scale(1.05)", 
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)" 
  },
  propertyImage: { 
    width: "100%", 
    height: "200px", 
    objectFit: "fill", 
    borderRadius: "10px", 
    margin: "10px auto" 
  },
  propertyInfo: { 
    fontSize: "16px", 
    marginBottom: "10px", 
    color: "#333" 
  },
  buttonContainer: { 
    marginTop: "15px", 
    display: "flex", 
    gap: "10px", 
    justifyContent: "end", 
    alignItems: "center" 
  },
  buyButton: { 
    padding: "8px 18px", 
    fontSize: "16px", 
    border: "none", 
    borderRadius: "25px", 
    cursor: "pointer", 
    fontWeight: "bold", 
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)", 
    color: "white" 
  },
  favIcon: { 
    fontSize: "20px", 
    cursor: "pointer", 
    padding: "10px", 
    borderRadius: "50%", 
    transition: "0.3s" 
  },
  propertyLink: { 
    display: "block", 
    marginTop: "15px", 
    textDecoration: "none", 
    color: "#943ce7b2", 
    fontWeight: "bold", 
    transition: "color 0.3s" 
  },
  propertyLinkHovered: { 
    textDecoration: "underline", 
    color: "#943ce7c2" 
  },
  noProperties: { 
    fontSize: "20px", 
    color: "red", 
    marginTop: "20px" 
  }
};
