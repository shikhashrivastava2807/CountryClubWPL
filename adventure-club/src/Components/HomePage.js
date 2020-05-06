import React from "react";
import ContactUs from "./ContactUs";
import DemoSlider from "./DemoSlider";
//  import Navbars from "./Navbars";
import { Navbar } from "react-bootstrap";


function HomePage() {
    return (
            <>
                 {/* <Navbars />  */}
                <DemoSlider/>
                <ContactUs/>
            </>
    );
}

export default HomePage;

