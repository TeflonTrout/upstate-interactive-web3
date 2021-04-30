import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import App from '../App.js';
const Web3 = require('Web3')

configure({ adapter: new Adapter() });

describe("App", () => {
 it("Application Renders Correctly", () => {
    const component = shallow(<App />);
  
    expect(component).toMatchSnapshot();
 });
});

//Snapshot test of App component
test('App component', () => {
    const tree = renderer.create(<App />).toJSON()
        
    expect(tree).toMatchSnapshot();
})

//Test what version of Web3 is used
test('Web3 Version', () => {
    expect(Web3.version).toEqual("1.3.5");
})