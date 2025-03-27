import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import photo from '../../assets/page1.jpeg';
import photo1 from '../../assets/page2.jpeg';
import photo3 from '../../assets/Page3.jpeg';
import photo4 from '../../assets/page5.png';
import photo6 from '../../assets/page6.jpeg';
import photo7 from '../../assets/page7.jpeg';
function Home() {
    const styles = {
        main: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "15px",
            width:"100%",
            background:`url(${photo6}) no-repeat center/cover`,
             backdropFilter:"blur(20px)"
        },
        content: {
            textAlign: "center",
            maxWidth: "90%",
            fontSize: "18px",
            lineHeight: "1.6",
            fontStyle:"italic",
            color:"rgba(224, 230, 228, 0.92)",
            marginTop:"20px",
        },
        gridContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            width: "80%",
            justifyContent: "center"
        },
        image: {
            width: "100%",
            maxWidth: "300px",
            height: "100%",
            borderRadius: "10px"
        }
    };

    return (
        <div className="one2" >
            <div className="overlay2"></div>
        <div style={styles.main} className='body'>
            <div style={styles.content}>
                <h1>Welcome to Our Real Estate Platform</h1>
                <p>
                    A <b>Real Estate Website</b> serves as an online marketplace that connects buyers, sellers, renters, and real estate agents. 
                    It provides a digital platform where users can explore properties, compare prices, and make informed decisions regarding real estate investments.
                </p>
                <p>
                    The real estate industry has been revolutionized by digital platforms that allow users to view properties from the comfort of their homes.
                    With high-resolution images, virtual tours, and interactive maps, these platforms enhance the property search experience.
                </p>

                <p>Explore the following images to get a glimpse of real estate layouts and designs:</p>
            </div>
            <div style={styles.gridContainer}>
                <img src={photo} alt="Real Estate Property 1" style={styles.image} />
                <img src={photo4} alt="Real Estate Property 2" style={styles.image} />
                <img src={photo1} alt="Real Estate Property 3" style={styles.image} />
                <img src={photo3} alt="Real Estate Property 4" style={styles.image} />
                <img src={photo6} alt="Real Estate Property 5" style={styles.image} />
                <img src={photo7} alt="Real Estate Property 5" style={styles.image} />
            </div>
            <div style={styles.content}>
            <p>
                    A well-designed real estate website should offer advanced search filters, location-based property listings, mortgage calculators, and customer reviews to 
                    provide users with all the necessary details before making a decision.
                </p>
                <p>
                    Whether you're looking to <b>buy, sell, or rent</b>, a real estate website helps streamline the process by offering easy access to property details, agent contacts, 
                    and legal documentation.
                </p>
            
            </div>
            </div>
            
        </div>
    );
}

export default Home;
