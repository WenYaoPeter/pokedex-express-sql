var React = require("react");

class Find extends React.Component {
  render() {

    return (
      <html>
        <head/>
        <body>
            <div>
            <div>{this.props.pokedex.id}</div>
            <div>{this.props.pokedex.num}</div>
            <div>{this.props.pokedex.name}</div>
            <img src={this.props.pokedex.img}/>
            <div>{this.props.pokedex.weight}</div>
            <div>{this.props.pokedex.height}</div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Find;