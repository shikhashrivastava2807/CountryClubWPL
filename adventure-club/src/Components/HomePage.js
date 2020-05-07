import React from "react";
import ContactUs from "./ContactUs";
import DemoSlider from "./DemoSlider";
import { Navbar } from "react-bootstrap";
import ClubDetails from "./ClubDetails";



function HomePage() {
    return (
            <>
                <DemoSlider/>
                <div className='m-5'>
                <ClubDetails />
                </div>
                <div>
                <ContactUs/>
                </div>
               

            </>
    );
}

export default HomePage;

