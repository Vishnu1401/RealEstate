
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import photo from "../../../assets/page1.jpeg";

function Agent() {
  const { pid } = useParams();
  const navigate = useNavigate();

  // State for form data
  const [formdata, setFormdata] = useState({
    type: "",
    location: "",
    ownername: "",
    owneremail: "",
    ownercontact: "",
    id: "",
    image:""
  });

  const [customType, setCustomType] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  useEffect(() => {
    if (!pid) return;
  
    const getProperty = async () => {
      try {
        console.log("Fetching property with pid:", pid);
        const response = await axios.get(`http://localhost:8080/getproperty/${pid}`);
        console.log("Response Data:", response.data); 
        if (Array.isArray(response.data) && response.data.length > 0) {
          const property = response.data[0];
          console.log("Property Data:", property);
  
          setFormdata({
            type: property.type || "",
            location: property.location || "",
            ownername: property.ownerName || "", 
            owneremail: property.ownerEmail || "",
            ownercontact: property.ownerContact || "",
            id:property.id||"",
            image:property.image||""
          });
  
          if (property.type === "Other") {
            setShowCustomInput(true);
            setCustomType(property.type);
          }
        } else {
          alert("Failed to retrieve property data.");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        alert("Error fetching property data. Check console for details.");
      }
    };
  
    getProperty();
  }, [pid]);
  
  

  // Handle input changes
  const handleInput = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  // Handle property type selection
  const handlePropertyTypeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Other") {
      setShowCustomInput(true);
      setCustomType(""); // Reset input
      setFormdata({ ...formdata, type: "" });
    } else {
      setShowCustomInput(false);
      setFormdata({ ...formdata, type: selectedValue });
    }
  };

  // Handle custom property type input
  const handleCustomTypeChange = (e) => {
    setCustomType(e.target.value);
    setFormdata({ ...formdata, type: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.type || !formdata.location || !formdata.ownername) {
      alert("Property type, location, and owner name are mandatory");
      return;
    }
    if (!formdata.ownercontact && !formdata.owneremail) {
      alert("Mention contact number or email details of the owner");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/updateproperty", formdata);
      if (response.data.success) {
        alert(response.data.success);
        navigate(-1);
      } else {
        alert(response.data.failed);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div style={{ ...styles.container, background: `url(${photo}) no-repeat center/cover` }}>
      <div style={styles.overlay}></div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <legend style={styles.legend}>Property Details</legend>

        {/* Property Type */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="type">Type of Property:</label>
          <select style={styles.select} name="type" id="type" value={formdata.type} onChange={handlePropertyTypeChange}>
            <option value="">Select Property Type</option>
            {["Apartment", "Hotel", "Open place", "Ground", "Function Hall", "Other"].map((value, idx) => (
              <option key={idx} value={value}>{value}</option>
            ))}
          </select>
          {showCustomInput && (
            <input
              type="text"
              style={styles.input}
              placeholder="Enter property type"
              value={customType}
              onChange={handleCustomTypeChange}
            />
          )}
        </div>

        {/* Form Fields */}
        {[{ label: "Location of Property", name: "location", placeholder: "Example: 1-187/A, Pulipadu, Gurazala...", isTextarea: true },
          { label: "Property Owner Name", name: "ownername" },
          { label: "Property Owner Email", name: "owneremail", type: "email" },
          { label: "Property Owner Phone Number", name: "ownercontact" }
        ].map(({ label, name, placeholder, isTextarea, type }, index) => (
          <div style={styles.formGroup} key={index}>
            <label style={styles.label} htmlFor={name}>{label}:</label>
            {isTextarea ? (
              <textarea
                style={styles.input}
                name={name}
                id={name}
                onChange={handleInput}
                value={formdata[name]}
                placeholder={placeholder}
              ></textarea>
            ) : (
              <input
                style={styles.input}
                type={type || "text"}
                name={name}
                id={name}
                onChange={handleInput}
                value={formdata[name]}
                placeholder={placeholder}
              />
            )}
          </div>
        ))}
        
        {/* Buttons */}
        <div style={styles.buttonBlock}>
          <button style={styles.button} type="button" onClick={() => navigate(-1)}>Back</button>
          <button style={styles.button} type="submit">Update Property</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
  form: {
    position: "relative",
    zIndex: 2,
    background: "rgba(255, 255, 255, 0.2)",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    gap: "20px",
    margin: "50px auto"
  },
  legend: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "purple",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    marginTop: "5px",
    width: "100%"
  },
  select: {
    height: "50px",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    cursor: "pointer",
    width: "100%",
  },
  buttonBlock: {
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
  },
};

export default Agent;
