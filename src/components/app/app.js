import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import { Button } from "reactstrap";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotService from "../../services/gotService";

export default class App extends Component {
  gotService = new gotService();
  state = {
    showRandomChar: true,
    error: false,
  };

  componentDidCatch() {
    console.log("error");
    this.setState({
      error: true,
    });
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar,
      };
    });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const char = this.state.showRandomChar ? <RandomChar /> : null;

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {char}
              <Button
                onClick={this.toggleRandomChar}
                outline
                color="info"
                style={{ marginBottom: "20px" }}
              >
                Toggle random char
              </Button>
            </Col>
          </Row>
          <CharacterPage />
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
          );
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
          );
        </Container>
      </>
    );
  }
}
