import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {

    componentDidMount() {
        const streamid = this.props.match.params.id;
        this.props.fetchStream(streamid);
    }

    renderActions(){
        return(
            <>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)} className="ui button negative">Delete</button>
                <Link className="ui button" to="/">Cancel</Link>
            </>
        );
    }

    renderContent() {
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete the stream: ${this.props.stream.title}`
    }

    render(){
        return (
            <div>
                <h1>StreamDelete</h1>
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push("/")}
                />
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);