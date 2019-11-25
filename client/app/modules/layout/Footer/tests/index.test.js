import React from 'react';
import { shallow } from 'enzyme';

import Footer from '..';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(<Footer />);
    expect(
      renderedComponent.contains(
        <section><b>PDP CI/CD project by @maxa. 2019ddddddddd</b></section>
      )
    ).toBe(true);
  });
});
