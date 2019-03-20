import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../components/dashboard';


jest.mock('../../../utils/socket.js');


describe('Test for the Dashboard', () => {
	it('should render dashboard page', () => {
		const wrapper = shallow(
				<Dashboard />
		);

		expect(wrapper).toMatchSnapshot();
	});
});
