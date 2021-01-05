import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { LandingPageItem } from '../../models/interfaces';
import { calculatePortalStyles } from '../../lib/utils';

interface Props {
  item: LandingPageItem;
  size: number;
  switchComponent: (newComponent: string) => void;
}

export default class Shortcut extends Component<Props> {
  render (): JSX.Element {
    return (
      <a
        href={this.props.item.url}
      >
        <Button
          className='landing-button-big'
          size='lg'
          style={calculatePortalStyles(this.props.size)}
          variant='secondary'
          onClick={() => this.props.switchComponent('LoadWebsite')}
        >
          <span>{this.props.item.title}</span>
        </Button>
      </a>
    );
  };
}
