import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';



class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note:{}
        };
    }

    componentDidMount() {
        // const id = this.props.match.match.params.id-1;
        // this.setState({note:this.props.noteEntries[id]})

        // console.log('this.props: ', this.props)
        const id = this.props.match.match.params.id;
        // console.log('id: ', id)

        let note = this.props.noteEntries.filter(noteEntry => noteEntry.id ==id)
        note = note[0]
        // console.log('note: ', note)

        this.setState({note:note})

    }

    render() {
        return (
            <div>
                <div>
                    <Link to={`/editNote/${this.state.note.id}`}>
                        <button>edit</button>
                    </Link>
                    <br />
 
                    <Link to={`/`}>
                    <button onClick={(e) => this.props.deleteNoteEntry(e, this.props.match.match.params.id)}>
                        <Link to={`/`}>
                            delete
                        </Link>
                    </button>
                    </Link>
                </div>
                
                <div>
                   {this.state.note.title}
                    <br />
                   {this.state.note.textBody}
                </div>
            </div>
        ) 
    }
}

// const Note = props => {
//     return (
//         <div>
//             <div>
//                 <Link to={"/editNote"}>
//                     <button>edit</button>
//                 </Link>
//                 <br />
//                 <button>delete</button>
//             </div>
            
//             <div>
//                 TITLE:{props.noteEntries[1].title}
//                 <br />
//                 TEXT: {props.noteEntries[1].textBody}
//             </div>
//         </div>
//     )
// }

export default Note