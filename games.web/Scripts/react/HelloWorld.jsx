var CommentBox = React.createClass({
    render: () => {

        console.log('render', this);

        return (
          <div className="commentBox">
            Hello, world! I am a CommentBox.
          </div>
      );
    }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('home')
);