var BookRecord = React.createClass({
	getInitialState: function() {
		return {
			nextApply:null 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer:function() {
		var bookId = this.props.book.pk;
		var url = '/drift/' + bookId + '/next/get/';
		$.get(url,function(res){
			res = JSON.parse(res);
			if(res.length){
				var nextApply = res[0];
				this.setState({
					nextApply:nextApply 
				});
			}
		}.bind(this));
	},
	getRightPart : function() {
		var nextApply = this.state.nextApply;
		if(!nextApply){
			return (<span>暂无申请者</span>);
		}
		var nextUserId = nextApply.fields.user;
		return (
			<span>
				<UserAvatar userId={nextUserId} />
				<span onClick={this.addDrift}>转给他</span>
			</span>
		);
	},
	addDrift : function() {
		var nextApply = this.state.nextApply;
		var nextUserId = nextApply.fields.user;
		var bookId = this.props.book.pk;
		var url = '/drift/' + bookId + '/to/' + nextUserId + '/';
		$.get(url,function(res){
			if(res=='200'){
				this.unmount();
			}
		}.bind(this));
	},
	unmount: function() {
  		var node = this.getDOMNode();
  		React.unmountComponentAtNode(node);
  		$(node).remove();
	},
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		var rightPart = this.getRightPart();
		return (
			<div className="media" style={{borderTop:'solid 1px #ddd'}}>
  				<div className="media-left">
      				<img className="media-object" src={picture} />
				</div>
  				<div className="media-body">
    				<h4 className="media-heading">{this.props.book.fields.name}</h4>
    				<p>{this.props.book.fields.author}</p>
    				<span className="pull-right">{rightPart}</span>    
  				</div>
			</div>
		);
	}
});