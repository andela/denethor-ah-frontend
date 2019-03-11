import moment from 'moment';

export const toTimeFromNow = (date) => {
	return moment(date).fromNow(); 
}