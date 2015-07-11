var Book = React.createClass({
	
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		return (
			<div className="col-sm-3 col-md-3">
			<div className="book thumbnail" style={{textAlign:'center',border:'none'}}>
				<img src={picture} style={{width:242,height:200}}/>
      			<div className="caption">
        			<h3>{this.props.book.fields.name}</h3>
        			<p>{this.props.book.fields.author}</p>
        			<p>
        				<ApplyButton book={this.props.book} />
        				<LikeButton book={this.props.book} />
        			</p>
        		</div>
			</div>
			</div>
		);
	}
	
});