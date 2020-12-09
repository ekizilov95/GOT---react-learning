import React, { Component } from "react";
import "./itemList.css";
import gotService from "../../services/gotService";
import Spinner from "../spiner";

export default class ItemList extends Component {
  gotService = new gotService();

  state = {
    charList: null,
  };

  componentDidMount() {
    this.gotService.getAllCharacters().then((charList) => {
      this.setState({
        charList,
      });
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id, name } = item;
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onCharSelected(id)}
        >
          {name}
        </li>
      );
    });
  }

  render() {
    const { charList } = this.state;

    if (!charList) {
      return <Spinner />;
    }

    const items = this.renderItems(charList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
