import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Switch, NavLink } from 'react-router-dom';
import { Dashboard } from '../../../components/dashboard';
import { SideBar } from '../../../components/dashboard/side-bar';
import { ContentArea } from '../../../components/dashboard/content-area';

describe('Test for the Dashboard', () => {
	it('should render dashboard page', () => {
		const wrapper = mount( 
			<MemoryRouter>
				<Dashboard />
			</MemoryRouter>
		);

		expect(wrapper.find('.sidebar-links__item').length).toBe(5);
		expect(wrapper.find(SideBar).length).toBe(1);
		expect(wrapper.find(ContentArea).length).toBe(1);
		expect(wrapper.find(Switch).length).toBe(1);
		expect(wrapper.find(NavLink).length).toBe(5);
	});
});
