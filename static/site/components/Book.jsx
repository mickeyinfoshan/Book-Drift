var Book = React.createClass({
	getInitialState: function() {
		return {
			like:0 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer : function() {
		var url = '/book/' + this.props.book.pk + '/like/get/number/';
		$.get(url,function(res){
			this.setState({
				like:res 
			});
		}.bind(this));
	},
	addLike:function() {
		//if(!checkLogin()){
			//promptLogin();
		//}
		var userId = localStorage['userId'];
		var url = '/book/' + this.props.book.pk + '/like/by/' + userId +'/';
		$.get(url,function(res){
			if(res == 200){
				this.loadDataFromServer();
			}
		}.bind(this))
	},
	addApply : function() {
		var userId = localStorage['userId'];
		var bookId = this.props.book.pk;
		var url = '/drift/' + bookId + '/apply/by/' + userId + '/';
		$.get(url,function(res){
			if(res == '200'){
				alert("申请成功");
			}
		});
	},
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		return (
			<div className="col-sm-6 col-md-4">
			<div className="book thumbnail" style={{textAlign:'center'}}>
				<img src={picture} style={{width:242,height:200}}/>
      			<div className="caption">
        			<h3>{this.props.book.fields.name}</h3>
        			<p>{this.props.book.fields.author}</p>
        			<p>
        				<a href="#" className="btn btn-primary" role="button" onClick={this.addApply}>想要</a> 
        				<a href="#" className="btn btn-default" role="button" onClick={this.addLike}>
        					<span className="glyphicon glyphicon-thumbs-up">{this.state.like}</span>
        				</a>
        			</p>
        		</div>
			</div>
			</div>
		);
	}
	
});