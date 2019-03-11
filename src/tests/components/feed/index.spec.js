import React from 'react';
import { mount } from 'enzyme';
import FeedBottomLargeCard from '../../../components/feed/FeedBottomLargeCard';
import FeedBottomSmallCard from '../../../components/feed/FeedBottomSmallCard';

describe('Test for the feed bottom component', () => {
  const body = "<strong>Our original read time calculation was geared toward “slow” images, like comics, where you would really want to sit down and invest in the image. </strong>\n\nThis resulted in articles with crazy big read times. For instance, this article containing 140 images was clocking in at a whopping 87 minute read. So we amended our read time calculation to count 12 seconds for the first image, 11 for the second, and minus an additional second for each subsequent image. Any images after the tenth image are counted at three seconds.\n\n<img src='https://res.cloudinary.com/jsamcloud12/image/upload/v1552053108/blur-charge-close-up-256302.jpg' alt='featured' />\n\n    You might see this change reflected across the site. Keep in mind that our estimated read time is just that: an estimation. You might finish a story faster or slower depending on various factors such as how many children or cats you have, your caffeine/alcohol intake, or if you’re a time-traveler from the future and already read that story. We just want to give you a ballpark figure so you can decide whether you have time to read one more story before the bus comes, or if you should bookmark it for later.\n\n<img src='https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80' alt='featured' />\n\n\nYou begin with a text, you sculpt information, you chisel away what's not needed, you come to the point, make things clear, add value, you're a content person, you like words. Design is no afterthought, far from it, but it comes in a deserved second. Anyway, you still use Lorem Ipsum and rightly so, as it will always have a place in the web workers toolbox, as things happen, not always the way you like it, not always in the preferred order. Even if your less into design and more into content strategy you may find some redeeming value with, wait for it, dummy copy, no less.\n\n\nSo Lorem Ipsum is bad (not necessarily)\nI’ve heard the argument that “lorem ipsum” is effective in wireframing or design because it helps people focus on the actual layout, or color scheme, or whatever. What kills me here is that we’re talking about creating a user experience that will (whether we like it or not) be DRIVEN by words. The entire structure of the page or app flow is FOR THE WORDS.\nIf that's what you think how bout the other way around? How can you evaluate content with"
  const author = { username: 'Princess'}  
  const createdAt = '2018-03-10';
  it('should contain FeedBottomLargeCard ', () => {
        const wrapper = mount( < FeedBottomLargeCard  body={ body} author ={author } createdAt= {createdAt} /> );
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('div').length).toBe(5);
        expect(wrapper.find('h3').length).toBe(1);
        expect(wrapper.find('p').length).toBe(2);
    });
    it('should contain FeedBottomSmallCard correctly', () => {
      const wrapper = mount( < FeedBottomSmallCard body = { body } author ={author } createdAt= {createdAt} /> );
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(2);
      expect(wrapper.find('h3').length).toBe(1);
      expect(wrapper.find('p').length).toBe(2);
  })
})

