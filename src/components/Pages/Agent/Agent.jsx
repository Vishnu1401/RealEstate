// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import photo from "../../../assets/page1.jpeg";
// function Agent() {
//   const { roleid, username } = useParams();
//   const navigate = useNavigate();

//   const [formdata, setFormdata] = useState({
//     type: "",
//     location: "",
//     ownername: "",
//     owneremail: "",
//     ownercontact: "",
//     agentId: "",
//     image:""
//   });
  
//   const [insert, setInsertId] = useState(false);
//   const [customType, setCustomType] = useState("");
//   const [showCustomInput, setShowCustomInput] = useState(false);

//   useEffect(() => {
//     const getUserID = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/getuserid/${username}`);
//         if (response.data.success) {
//           setFormdata((prev) => ({ ...prev, agentId: response.data.success }));
//         } else {
//           alert(response.data.failed);
//         }
//       } catch (error) {
//         console.error("Error fetching user ID:", error);
//       }
//     };
//     getUserID();
//   }, [username]);

//   useEffect(() => {
//     if (insert) {
//       const insertData = async () => {
//         try {
//           const response = await axios.post("http://localhost:8080/insertproperty2", formdata);
//           if (response.data.success) {
//             alert(response.data.success);
//             navigate(`/intialagent/${roleid}/${username}`);
//           } else {
//             alert(response.data.failed);
//           }
//         } catch (error) {
//           console.error("Error inserting property:", error);
//         }
//       };
//       insertData();
//       setInsertId(false);
//     }
//   }, [insert, navigate, formdata, roleid, username]);

//   const handleInput = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const handlePropertyTypeChange = (e) => {
//     const selectedValue = e.target.value;
//     if (selectedValue === "Other") {
//       setShowCustomInput(true);
//       setFormdata({ ...formdata, type: "" });
//     } else {
//       setShowCustomInput(false);
//       setFormdata({ ...formdata, type: selectedValue });
//     }
//   };

//   const handleCustomTypeChange = (e) => {
//     setCustomType(e.target.value);
//     setFormdata({ ...formdata, type: e.target.value });
//   };
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormdata({ ...formdata, image: reader.result.split(",")[1] }); // Store Base64 string
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formdata.type || !formdata.location || !formdata.ownername) {
//       alert("Property type, location, and owner name are mandatory");
//       return;
//     }
//     if (!formdata.ownercontact && !formdata.owneremail) {
//       alert("Mention contact number or email details of the owner");
//       return;
//     }
//     setInsertId(true);
//   };

//   return (
//     <div style={{...styles.container,background:`url(${photo}) no-repeat center/cover`}}>
//       <div style={styles.overlay}></div>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <legend style={styles.legend}>Property Details</legend>
        
//         <div style={styles.formGroup}>
//           <label style={styles.label} htmlFor="type">Type of Property:</label>
//           <select style={styles.select} name="type" id="type" onChange={handlePropertyTypeChange}>
//             <option value="">Select Property Type</option>
//             {["Apartment", "Hotel", "Open place", "Ground", "Function Hall", "Other"].map((value, idx) => (
//               <option key={idx} value={value}>{value}</option>
//             ))}
//           </select>
//           {showCustomInput && (
//             <input
//               type="text"
//               style={styles.input}
//               placeholder="Enter property type"
//               value={customType}
//               onChange={handleCustomTypeChange}
//             />
//           )}
//         </div>

//         {[{ label: "Location of Property", name: "location", placeholder: "Example: 1-187/A, Pulipadu, Gurazala...", isTextarea: true },
//           { label: "Property Owner Name", name: "ownername" },
//           { label: "Property Owner Email", name: "owneremail", type: "email" },
//           { label: "Property Owner Phone Number", name: "ownercontact" }
//         ].map(({ label, name, placeholder, isTextarea, type }, index) => (
//           <div style={styles.formGroup} key={index}>
//             <label style={styles.label} htmlFor={name}>{label}:</label>
//             {isTextarea ? (
//               <textarea
//                 style={styles.input}
//                 name={name}
//                 id={name}
//                 onChange={handleInput}
//                 placeholder={placeholder}
//               ></textarea>
//             ) : (
//               <input
//                 style={styles.input}
//                 type={type || "text"}
//                 name={name}
//                 id={name}
//                 onChange={handleInput}
//                 placeholder={placeholder}
//               />
//             )}
//           </div>
          
//         ))}
//          <div style={styles.formGroup}>
//          <label style={styles.label} htmlFor="image">Upload Image</label>
//          <input type="file" name="image" accept=".png ,.jpg ,.jpeg" id="image" onChange={handleImageUpload} />
//          </div>
//         <div style={styles.buttonBlock}>
//           <button style={styles.button} type="button" onClick={() => navigate(-1)}>Back</button>
//           <button style={styles.button} type="submit">Add Property</button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import photo from "../../../assets/page1.jpeg";
import { ToastContainer, toast } from 'react-toastify';

function Agent() {
  const { roleid, username } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    location: "",
    ownername: "",
    owneremail: "",
    ownercontact: "",
    agentId: "",
    image: null,
  });

  const [insert, setInsert] = useState(false);
  const [customType, setCustomType] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    const getUserID = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getuserid/${username}`);
        if (response.data.success) {
          setFormData((prev) => ({ ...prev, agentId: response.data.success }));
        } else {
          toast.error(response.data.failed);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    getUserID();
  }, [username]);

  useEffect(() => {
    if (insert) {
      const insertData = async () => {
        try {
          const data = new FormData();
          data.append("type", formData.type);
          data.append("location", formData.location);
          data.append("ownerName", formData.ownername);
          data.append("ownerEmail", formData.owneremail);
          data.append("ownerContact", formData.ownercontact);
          data.append("agentId", formData.agentId);
          if (formData.image) {
            data.append("image", formData.image);
          }

          const response = await axios.post("http://localhost:8080/insertproperty2", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (response.data.success) {
           toast.success(response.data.success);
            navigate(`/intialagent/${roleid}/${username}`);
          } else {
            toast.error(response.data.failed);
          }
        } catch (error) {
          console.error("Error inserting property:", error);
        }
      };
      insertData();
      setInsert(false);
    }
  }, [insert, navigate, formData, roleid, username]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePropertyTypeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Other") {
      setShowCustomInput(true);
      setFormData({ ...formData, type: "" });
    } else {
      setShowCustomInput(false);
      setFormData({ ...formData, type: selectedValue });
    }
  };

  const handleCustomTypeChange = (e) => {
    setCustomType(e.target.value);
    setFormData({ ...formData, type: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.location || !formData.ownername) {
      alert("Property type, location, and owner name are mandatory");
      return;
    }
    if (!formData.ownercontact && !formData.owneremail) {
      alert("Mention contact number or email details of the owner");
      return;
    }
    setInsert(true);
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ ...styles.container, background: `url(${photo}) no-repeat center/cover` }}>
      <div style={styles.overlay}></div>
      <form style={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
        <legend style={styles.legend}>Property Details</legend>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="type">Type of Property:</label>
          <select style={styles.select} name="type" id="type" onChange={handlePropertyTypeChange}>
            <option value="">Select Property Type</option>
            {["Apartment", "Hotel", "Open place", "Ground", "Function Hall", "Other"].map((value, idx) => (
              <option key={idx} value={value}>{value}</option>
            ))}
          </select>
          {showCustomInput && (
            <input type="text" style={styles.input} placeholder="Enter property type" value={customType} onChange={handleCustomTypeChange} />
          )}
        </div>

        {[{ label: "Location of Property", name: "location", placeholder: "Example: 1-187/A, Pulipadu, Gurazala...", isTextarea: true },
          { label: "Property Owner Name", name: "ownername" },
          { label: "Property Owner Email", name: "owneremail", type: "email" },
          { label: "Property Owner Phone Number", name: "ownercontact" }
        ].map(({ label, name, placeholder, isTextarea, type }, index) => (
          <div style={styles.formGroup} key={index}>
            <label style={styles.label} htmlFor={name}>{label}:</label>
            {isTextarea ? (
              <textarea style={styles.input} name={name} id={name} onChange={handleInput} placeholder={placeholder}></textarea>
            ) : (
              <input style={styles.input} type={type || "text"} name={name} id={name} onChange={handleInput} placeholder={placeholder} />
            )}
          </div>
        ))}

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="image">Upload Image</label>
          <input type="file" name="image" accept=".png ,.jpg ,.jpeg" id="image" onChange={handleImageUpload} />
        </div>

        <div style={styles.buttonBlock}>
          <button style={styles.button} type="button" onClick={() => navigate(-1)}>Back</button>
          <button style={styles.button} type="submit">Add Property</button>
        </div>
      </form>
    </div>
    </div>
  );
}



const styles = {
  container: {
    position: "relative",
    width: "100vw",
    minHeight: "100vh",
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
    margin:"50px auto",
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
    marginTop:"5px",
    width:"100%"
  },
  select: {
    height: "50px", 
    fontSize: "16px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    cursor: "pointer",
    width:"100%",
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
