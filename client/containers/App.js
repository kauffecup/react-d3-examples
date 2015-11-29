import React, { Component, PropTypes } from 'react';
import { connect }          from 'react-redux';
import { toggleData, toggleComponent } from '../Actions';

import ComponentToggler  from '../components/ComponentToggler';
import SimpleComponent01 from '../components/example_01/SimpleComponent_01';
import SimpleComponent02 from '../components/example_02/SimpleComponent_02';
import SimpleComponent03 from '../components/example_03/SimpleComponent_03';
import SimpleComponent04 from '../components/example_04/SimpleComponent_04';

const colorLegend = [
  // reds from dark to light
  "#67000d", "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
  //neutral grey
  "#f0f0f0",
  // blues from light to dark
  "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", '#08519c', "#08306b"
];

/**
 * Our main App container. Only consists of a "component toggler" and "component".
 * The toggler allows the user to select which D3 component to view the data in, and
 * the component is... that D3 component. The data stays consistent when toggling.
 */
class MyApp extends Component {
  render () {
    // injected via connect call
    const { dispatch, data, component, components } = this.props;

    // choose which component we want based on the state
    var mycomponent;
    switch (component._id) {
      case '00':
        mycomponent = <SimpleComponent01 data={data} colorLegend={colorLegend} />;
        break;
      case '01':
        mycomponent = <SimpleComponent02 data={data} colorLegend={colorLegend} />;
        break;
      case '02':
        mycomponent = <SimpleComponent03 data={data} colorLegend={colorLegend} />;
        break;
      case '03':
        mycomponent = <SimpleComponent04 data={data} colorLegend={colorLegend} />;
        break;
    }

    return (
      <div className="my-app" onClick={() => dispatch(toggleData())} >
        <ComponentToggler components={components}
          selectedComponent={component._id}
          onClick={(id) => dispatch(toggleComponent(id))} />
        {mycomponent}
      </div>
    );
  }
};

MyApp.propTypes = {
  data: PropTypes.array.isRequired,
  component: PropTypes.object.isRequired,
  components: PropTypes.array.isRequired
}

// Wrap the component to inject dispatch and state into it
export default connect(state => state)(MyApp)
