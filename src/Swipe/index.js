import React, { Component } from "react";
import Swipeable from "react-swipy";
import ClassNames from "classnames";

import "./style.scss";
import "./components/card.scss";
import Card from "./components/Card";

const appStyles = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "100vh",
  overflow: "hidden"
};

const wrapperStyles = {
  position: "relative",
  width: "300px",
  height: "400px"
};

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12
};

class TestView extends Component {
  state = {
    cards: [
      {
        id: 1,
        image:
          "https://i.pinimg.com/564x/d5/43/8f/d5438fd6a60dbec14a568e52f9d598d5.jpg",
        name: "San Francisco",
        country: "United States",
        destination: "Golden Gate Bridge",
        fact: "SF has the second largest Chinatown outside of Asia."
      },
      {
        id: 2,
        image:
          "https://i.pinimg.com/564x/92/1c/ee/921cee63f0a9943c93b609f735f520cc.jpg",
        name: "Bali",
        country: "Indonesia",
        destination: "Campuhan Ridge Walk",
        fact: "Bali has rich contemporary culture."
      },
      {
        id: 3,
        image:
          "https://i.pinimg.com/564x/91/7a/40/917a408230756aa0451e2480ceed1c6e.jpg",
        name: "Kyoto",
        country: "Japan",
        destination: "Fushimi Inari Taisha",
        fact: "Kyoto has many historical interesting sites."
      },
      {
        id: 4,
        image:
          "https://i.pinimg.com/564x/da/98/fd/da98fd7f13f75aef9db9318570cd5cec.jpg?b=t",
        name: "Seville",
        country: "Spain",
        destination: "Plaza de España",
        fact: "Home to some of Spain’s best Fiestas!"
      },
      {
        id: 5,
        image:
          "https://i.pinimg.com/564x/f6/97/68/f69768983b74799bab9fc6b0aabf1b67.jpg",
        name: "Paris",
        country: "France",
        destination: "Eiffel Tower",
        fact: "Paris was originally a Roman City called Lutetia."
      },
      {
        id: 6,
        image:
          "https://i.pinimg.com/564x/44/33/af/4433af635caae75ae033e57b4a0c832b.jpg",
        name: "Cappadocia",
        country: "Turkey",
        destination: "Goreme Open Air Museum",
        fact: "'Cappadocia' means 'the land of beautiful horses'."
      },
      {
        id: 7,
        image:
          "https://i.pinimg.com/564x/29/ac/30/29ac3018fb4c5fede15f52ccaf4cef41.jpg",
        name: "London",
        country: "England",
        destination: "Big Ben",
        fact: "The Queen lives in Buckingham Palace."
      },
      {
        id: 8,
        image:
          "https://i.pinimg.com/564x/12/4a/94/124a947f8e7949cec81776c7a86f2770.jpg?b=t",
        name: "Santorini",
        country: "Greece",
        destination: "Santorini Wine Museum",
        fact: "Santorini's official name is actually Thira."
      }
    ],
    like: null,
    dislike: null,
    detail: false
  };

  componentDidMount() {
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.preventTouch, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.preventTouch, {
      passive: false
    });
  }

  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e) {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }

  remove = () => {
    this.setState(({ cards }) => ({ cards: cards.slice(1, cards.length) }));
  };

  handleSwipeRight = number => {
    this.setState({
      like: number
    });
  };

  handleSwipeLeft = number => {
    this.setState({
      dislike: number
    });
  };

  toggleDetail = () => {
    this.setState({
      detailShown: !this.state.detailShown
    });
  };

  closeDetail = () => {
    this.setState({
      detailShown: false
    });
  };

  render() {
    const { cards } = this.state;

    return (
      <div style={appStyles}>
        <div style={wrapperStyles}>
          {cards.length > 0 && (
            <div style={wrapperStyles}>
              <Swipeable
                buttons={({ right, left }) => (
                  <div style={actionsStyles}>
                    <div
                      className={ClassNames("button__dislike", {
                        "is-active": this.state.dislike === cards[0].id
                      })}
                      style={{ zIndex: this.state.detailShown ? -1 : 1 }}
                      onClick={() => {
                        left(), this.handleSwipeLeft(cards[0].id);
                      }}
                    />
                    <div
                      className={ClassNames("button__like", {
                        "is-active": this.state.like === cards[0].id
                      })}
                      onClick={() => {
                        right(), this.handleSwipeRight(cards[0].id);
                      }}
                    />
                  </div>
                )}
                onSwipe={this.closeDetail}
                onAfterSwipe={this.remove}
              >
                <Card
                  zIndex={-1}
                  name={cards[0].name}
                  country={cards[0].country}
                  destination={cards[0].destination}
                  fact={cards[0].fact}
                  img={cards[0].image}
                  detailShown={this.state.detailShown}
                  toggleDetail={this.toggleDetail}
                />
              </Swipeable>
              {cards.length > 1 && (
                <Card
                  zIndex={-2}
                  name={cards[1].name}
                  country={cards[1].country}
                  destination={cards[1].destination}
                  fact={cards[1].fact}
                  img={cards[1].image}
                  detailShown={this.state.detailShown}
                  toggleDetail={this.toggleDetail}
                />
              )}
            </div>
          )}
          {cards.length <= 1 && (
            <div className="card" style={{ zIndex: -2 }}>
              No more destination
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TestView;
