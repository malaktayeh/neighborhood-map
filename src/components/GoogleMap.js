import React, { Component } from 'react'

const styles = {
  map: {
    height: "100vh"
  }
}

class Map extends Component {
  constructor(props) {
    super(props);

    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );

    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.google.com/maps/api/js?key=' + process.env.GOOGLE_MAPS_API_KEY;
      var headScript = document.getElementsByTagName('script')[0];
      headScript.parentNode.insertBefore(script, headScript);
      
      script.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={styles.map} id={this.props.id} />
    )
  }
  
}

export default Map;