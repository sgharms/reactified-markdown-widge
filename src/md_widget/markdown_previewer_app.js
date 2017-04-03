import React from 'react';
import MarkdownEntryArea from './md_entry_area'
import HtmlDisplayArea from './html_display_area'
import marked from 'marked'

class MarkdownPreviewerApp extends React.Component {
  constructor(args) {
    super(args);
    this.state = {
      markdownText: "",
      previewText: "<em>Preview here</em>"
    };

    /* Subtle thing in React
     *
     * In order for the `this.clickThing` to work, as used in the render()
     * function's JSX, we have to do the following.
     *
     * See https://facebook.github.io/react/docs/handling-events.html
     *
     * with the Toggle example. In that example they've done this with a
     * handler called handleClick. You might well feel that this is ugly, but
     * that concern is documented in the reference above!
     *
     */
    this.clickThing = this.clickThing.bind(this);
  }

  clickThing(e) {
    this.setState({ markdownText: e.target.value });

    /* You might think that you could do this more simply as:
     *
     *  this.setState({ markdownText: e.target.value });
     *  this.setState({ previewText: marke(this.state.markdownText) });
     *
     * But this doesn't work! You have to remember the warnings provided at:
     *
     * https://facebook.github.io/react/docs/state-and-lifecycle.html
     *
     * under "Using State Correctly"
     *
     * Since the update may happen asynchronously, you might not have what you
     * expect.
     *
     */
    this.setState((prevState, props) => ({
      previewText: marked(prevState.markdownText)
    }))
  }

  render() {
    return (
      <div className="markdown-previewer-app" onChange={this.clickThing}>
        <MarkdownEntryArea />
        <HtmlDisplayArea content={this.state.previewText}/>
      </div>
    )
  }
}

export default MarkdownPreviewerApp
