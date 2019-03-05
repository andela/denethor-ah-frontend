import React from "react";
import renderer from "react-test-renderer";
import Header  from "../../../components/header/Header";
import { BrowserRouter, Switch} from 'react-router-dom';
// import { shallow } from 'enzyme'

describe("Header component", () => {
 
});

test("it renders correctly as a static component", () => {
  const rendered = renderer.create(
      <BrowserRouter>
        <Switch>
          <Header/>
        </Switch>
      </BrowserRouter>
    )
  expect(rendered.toJSON().type).toEqual('div');
  expect(rendered.toJSON().props.className).toEqual('header');
});