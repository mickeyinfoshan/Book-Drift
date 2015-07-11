var BookRecord = React.createClass({
	getInitialState: function() {
		return {
			nextApply:null,
			showForm : false 
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
				var showForm = this.state.showForm;
				this.setState({
					nextApply:nextApply ,
					showForm : showForm
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
	showUpdateForm:function() {
		this.toggleForm(true);
	},
	closeForm:function() {
		this.toggleForm(false);
	},
	toggleForm:function(show){
		var nextApply = this.state.nextApply;
		this.setState({
			nextApply:nextApply,
			showForm:show 
		});
	},
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		var rightPart = this.getRightPart();
		return (
			<div className="media" style={{borderTop:'solid 1px #ddd'}}>
  				<div className="media-left">
      				<img className="media-object" src={picture} style={{width:242,height:200}}/>
				</div>
  				<div className="media-body">
    				<h4 className="media-heading">{this.props.book.fields.name}</h4>
    				<p>{this.props.book.fields.author}</p>
    				<p>{this.props.book.fields.description}</p>
    				<button className="btn" onClick={this.showUpdateForm}>修正</button>
    				<span className="pull-right">{rightPart}</span>    
  				</div>
  				<ReactBootstrap.Modal show={this.state.showForm} onHide={this.closeForm}>
					<ReactBootstrap.Modal.Header closeButton>
            			<ReactBootstrap.Modal.Title>修正书籍</ReactBootstrap.Modal.Title>
          			</ReactBootstrap.Modal.Header>
          			<ReactBootstrap.Modal.Body>
          				<UpdateBookForm book={this.props.book} success={this.closeForm}/>
          			</ReactBootstrap.Modal.Body>
				</ReactBootstrap.Modal>
			</div>
		);
	}
});