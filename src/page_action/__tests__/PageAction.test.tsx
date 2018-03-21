import * as React from 'react';
import { PageAction } from '../PageAction';
import * as renderer from 'react-test-renderer';

describe('Page Action', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<PageAction />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
