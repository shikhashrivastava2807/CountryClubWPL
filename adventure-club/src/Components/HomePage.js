import React from "react";
import ContactUs from "./ContactUs";
import DemoSlider from "./DemoSlider";
import { Navbar } from "react-bootstrap";
import CountryClubDetails from "./CountryClubDetails";



function HomePage() {
    return (
            <>
                <DemoSlider/>
                <div className='m-5'>
                <CountryClubDetails />
                </div>
                <div>
                <ContactUs/>
                </div>
               

            </>
    );
}

export default HomePage;

