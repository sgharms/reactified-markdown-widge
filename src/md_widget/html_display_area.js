import React from 'react';
import marked from 'marked'

class HtmlDisplayArea extends React.Component {
  createMarkup() {
    return { __html: marked(this.props.content) }
  }

  render() {
    /*
     * Because we're rendering HTML (createMarkup()) React notices that we're
     * effectively going to monkey with the .innerHTML of the <div>. It
     * realizes that this could be a malicious attack. It's possible, for
     * example, that someone could get you to load malicious JavaScript that
     * makes some page look like a login to your bank but which forwards your
     * data to their server. To make it possible to inject HTML here, as we
     * need to do, requires this strange "dangerouslySetInnerHTML" and
     * returning the object seen in createMarkup().
     *
     * For more info: https://facebook.github.io/react/docs/dom-elements.html
     *
     */

    return (
      <div dangerouslySetInnerHTML={this.createMarkup()} className="md-widget-html-display-area"/>
    )
  }
}

export default HtmlDisplayArea
