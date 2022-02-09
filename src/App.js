import React from 'react';
import './App.css';
export default class App extends React.Component {
    state = {
        items: [],
        url: ""
    }

    handleInput = event => {
        this.setState({ url: event.target.value });
    };

    fetchItems = () => {
        return new Promise((resolve) => {
            fetch(this.state.url)
                .then((response) => response.json())
                .then(List => {
                    this.setState({ items: List });
                    resolve();
                });

        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleInput}></input>
                <button onClick={this.fetchItems}>Load items</button>
                <h2>items</h2>
                {
                    this.state.items.length > 0 && (
                        <ul>
                            {this.state.items.map((item) => (
                                <li key={item.id}>{item.item}</li>
                            ))}
                        </ul>
                    )}

            </div>
        )
    }
}