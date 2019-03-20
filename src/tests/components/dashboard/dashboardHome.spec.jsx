import React from 'react';
import { shallow } from 'enzyme';
import { DashboardHome } from '../../../components/dashboard/DashboardHome';
import articles from '../../mock-data/articles';

describe('Test for the DashboardHome', () => {
	const props = {
		profile: {
			firstname: '',
			followers: '',
			following: '',
			lastname: '',
			username: '',
			bio: '',
		},
		articles
	};
	it('should render dashboard home view', () => {
		const wrapper = shallow( <DashboardHome {...props} /> );
		expect(wrapper.length).toBe(1);
		expect(wrapper.find('.profile__banner-section').length).toBe(1);
		expect(wrapper.find('.profile__avatar-text-group').length).toBe(1);
	});
});
