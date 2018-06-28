var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Editing: {this.props.pokedex.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/pokemons/edit/"+ this.props.pokedex.id + "?_method=PUT"}
          >
            <div className="pokemon-attribute">
              id:<input name="id" type="text" defaultValue={this.props.pokedex.id} />
            </div>
            <div className="pokemon-attribute">
              num:<input
                name="num"
                type="text"
                defaultValue={this.props.pokedex.num}
              />
            </div>
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.pokedex.name}
              />
            </div>
            <div className="pokemon-attribute">
              img:<input
                name="img"
                type="text"
                defaultValue={this.props.pokedex.img}
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={this.props.pokedex.height}
              />
            </div>
            <div className="pokemon-attribute">
              weight:<input
                name="weight"
                type="text"
                defaultValue={this.props.pokedex.weight}
              />
            </div>
            <div className="pokemon-attribute">
              candy:<input
                name="candy"
                type="text"
                defaultValue={this.props.pokedex.candy}
              />
            </div>
            <div className="pokemon-attribute">
              candy_count:<input
                name="candy_count"
                type="text"
                defaultValue={this.props.pokedex.candy_count}
              />
            </div>
            <div className="pokemon-attribute">
              egg:<input
                name="egg"
                type="text"
                defaultValue={this.props.pokedex.egg}
              />
            </div>
            <div className="pokemon-attribute">
              avg_spawns:<input
                name="avg_spawns"
                type="text"
                defaultValue={this.props.pokedex.avg_spawns}
              />
            </div>
            <div className="pokemon-attribute">
              spawn_time:<input
                name="spawn_time"
                type="text"
                defaultValue={this.props.pokedex.spawn_time}
              />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
