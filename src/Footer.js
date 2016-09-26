import React, { Component } from 'react'
import {Icon, IconStack } from 'react-fa'
import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer>
        <ul>
          <li><a href="https://github.com/ash1day" target="_blank"><Icon name='github' size='3x' /></a></li>
          <li><a href="https://www.flickr.com/photos/114660384@N04/" target="_blank"><Icon name='flickr' size='3x' /></a></li>
          <li><a href="https://twitter.com/ash1day/" target="_blank"><Icon name='twitter' size='3x' /></a></li>
        </ul>
      </footer>
    )
  }
}

export default Footer
