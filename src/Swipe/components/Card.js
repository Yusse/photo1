import React, { Component } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

import "./card.scss";

let style;

class Card extends Component {
  static propTypes = {
    zIndex: PropTypes.number,
    name: PropTypes.string,
    country: PropTypes.string,
    destination: PropTypes.string,
    fact: PropTypes.string,
    img: PropTypes.string,
    detailShown: PropTypes.bool,
    toggleDetail: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      cardClicked: false
    };
  }

  zoomInCard = () => {
    this.setState({
      cardClicked: true
    });
  };

  zoomOutCard = () => {
    this.setState({
      cardClicked: false
    });
  };

  render() {
    if (this.props.img) {
      style = {
        backgroundImage: "url(" + this.props.img + ")",
        zIndex: this.props.zIndex
      };
    } else {
      style = {
        zIndex: this.props.zIndex
      };
    }

    return (
      <div
        className={ClassNames("card", {
          "is-active": this.state.cardClicked
        })}
        onMouseDown={this.zoomInCard}
        onTouchStart={this.zoomInCard}
        onMouseUp={this.zoomOutCard}
        onTouchEnd={this.zoomOutCard}
        style={style}
      >
        <div
          className={ClassNames("desc", {
            "desc--active": this.props.detailShown
          })}
          onMouseDown={e => {
            e.stopPropagation();
          }}
          onTouchStart={e => {
            e.stopPropagation();
          }}
          onClick={this.props.toggleDetail}
        >
          <div className="desc__main">
            <div>
              <div className="desc__title desc__title--main">
                {this.props.name}
              </div>
              <div className="desc__title desc__title--sub">
                {this.props.country}
              </div>
            </div>
            <i
              className={ClassNames(
                "arrow",
                { "arrow--up": this.props.detailShown },
                { "arrow--down": !this.props.detailShown }
              )}
            />
          </div>
          <div
            className={ClassNames("desc__detail", {
              "desc__detail--active": this.props.detailShown
            })}
          >
            <div className="desc__label desc__label--lbl">Must Visit</div>
            <div className="desc__label desc__label--value">
              {this.props.destination}
            </div>
            <div className="desc__label desc__label--lbl">Fun Facts</div>
            <div className="desc__label desc__label--value">
              {this.props.fact}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
