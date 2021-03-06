import React, { Component } from "react";
import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "./theme/theme";

class AppState extends Component {
  constructor(props) {
    super(props);

    this.updateSelectedBundles = this.updateSelectedBundles.bind(this);
    this.updateSelectedSource = this.updateSelectedSource.bind(this);
    this.clearSelectedBundles = this.clearSelectedBundles.bind(this);

    const match = props.match.params;
    this.state = {
      selectedBundles: (match && match.id) || null,
      selectedSource:
        (match && match.hover && decodeURIComponent(match.hover)) || null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        selectedBundles: this.props.match.params.id || null,
        selectedSource: null
      });
    }

    if (prevProps.match.params.hover !== this.props.match.params.hover) {
      this.setState({
        selectedSource: this.props.match.params.hover
          ? decodeURIComponent(this.props.match.params.hover)
          : null
      });
    }
  }

  updateRoute(route) {
    this.props.history.push(`${route}${window.location.search}`);
  }

  updateSelectedBundles(newBundle) {
    if (newBundle === this.state.selectedBundles) {
      this.updateRoute("/");
    } else {
      this.updateRoute("/" + newBundle);
    }
  }

  updateSelectedSource(newSource) {
    if (newSource === this.state.selectedSource) {
      this.updateRoute(
        this.state.selectedBundles ? "/" + this.state.selectedBundles : ""
      );
    } else {
      this.updateRoute(
        `/${this.state.selectedBundles}/${encodeURIComponent(newSource)}`
      );
    }
  }

  clearSelectedBundles() {
    this.setState({
      selectedBundles: null
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <App passedData={this.props.passedData} appState={this} />
      </MuiThemeProvider>
    );
  }
}
export default AppState;
