import React, { useEffect } from 'react';

const Map = (props) => {

  const onScriptLoad = ()  => {
    const map = new window.google.maps.Map(
      document.getElementById(props.id),
      props.options
    );

    props.onMapLoad(map)
  }

  useEffect(() => {
    if (!window.google) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.google.com/maps/api/js?key=' + process.env.GOOGLE_MAPS_API_KEY;
      var headScript = document.getElementsByTagName('script')[0];
      headScript.parentNode.insertBefore(script, headScript);
      
      script.addEventListener('load', e => {
        onScriptLoad()
      })
    } else {
      onScriptLoad()
    }
  });

  return (
    <div id={props.id} />
  )
  
  
}

export default Map;