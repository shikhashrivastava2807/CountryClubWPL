import React from "react";
import { Card, CardDeck } from "react-bootstrap";

const ClubDetails =  () => (
    <CardDeck>
  <Card>
    <Card.Img variant="top" src={require("../images/summer.jpg")} style={{height:250+'px'}} />
    <Card.Body>
      <Card.Title>Family Time</Card.Title>
      <Card.Text>
        Make memories with your near and dear ones by indulging in one of our many activities!
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src={require("../images/dining.jpg")} style={{height:250+'px'}} />
    <Card.Body>
      <Card.Title>Dining</Card.Title>
      <Card.Text>
        Come enjoy delicious meals with your loved ones with food made by world renowned chefs!{' '}
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src={require("../images/golf_1.jpg")} style={{height:250+'px'}}  />
    <Card.Body>
      <Card.Title>Golf</Card.Title>
      <Card.Text>
        Unwind with a day of golf with your closest buddies!
      </Card.Text>
    </Card.Body>

  </Card>
</CardDeck>
);

export default ClubDetails;



