import React, {useState} from 'react'
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import "../profile/userPicUpload/userpicmodal.css"

function ForumItemBody(props) {

    const [vote, setVote] = useState(props.replies);
    const [clicked, setClicked] = useState();


    function upVote() {
        if (clicked === "down") {
            setVote(vote + 1);
            setClicked("");
        } else {
            setVote(vote + 1);
            setClicked("up");
        }
    }

    function downVote() {
        if (clicked === "up") {
            setVote(vote - 1);
            setClicked("");
        } else {
            setVote(vote - 1);
            setClicked("down");
        }
    }


    let arrow;
    

    if (clicked === "up") {
        arrow = ( <div className="col-1 text-center">
        <CaretUpFill color="royalblue" size={40} />
        <h4 className="col px-md-1 text-center"> {vote} </h4>
        <CaretDownFill color="grey" size={40} onClick={downVote}/>
    </div> );
    } else if (clicked === "down"){
        arrow = ( <div className="col-1 text-center">
        <CaretUpFill color="grey" size={40} onClick={upVote} />
        <h4 className="col px-md-1 text-center"> {vote} </h4>
        <CaretDownFill color="red" size={40} />
        </div> );
    } else {
        arrow = ( <div className="col-1 text-center">
        <CaretUpFill color="grey" size={40} onClick={upVote} />
        <h4 className="col px-md-1 text-center"> {vote} </h4>
        <CaretDownFill color="grey" size={40} onClick={downVote}/>
        </div> );
    }




    return (
        <div>
            <div className="container mt-5">
                <hr/>
                <div className="row">
                    <div className="col-10">
                        <h1>{props.post}</h1>
                        <small> Asked 4 years ago</small> 
                        <small className="pl-3"> Replies {props.replies}</small> 
                        <small className="pl-3"> Viewed 23k times </small>
                    </div>
                    
                    <div className="col-2 pt-2 text-center">
                        <img src="/img/profile/default.jpg" alt="ProfilePic" className="rounded-circle forum-img-size"></img>
                        <p>{props.username}</p>
                    </div>
                    
                </div>
            
                    

                <div className="row mt-3">
                    {arrow} 
                    <div className="col-11">
                        <h4 className="">{props.post}</h4>
                    </div>
                </div>

                
             
            </div>
        </div>
    )
}

export default ForumItemBody
