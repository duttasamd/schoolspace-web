import React, { useState, useEffect } from 'react'
import './userpicmodal.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import axios from "axios";
import CookieService from "../../../services/CookieService";

function UserPicModal(props) {

    // fetch and set user image and initial browse image
    
    // browse
    const [browseImg, setBrowseImg] = useState();
    const handleChange = e => {
        setBrowseImg(URL.createObjectURL(e.target.files[0])) 
    }
    
    // fetch userImage and set initial browseImg
    const [userImage, setUserImage] = useState()
    // const getuserImage = () => {
	// 
    // };
    // setting profile image at the begining
    useEffect(() => {
        // getuserImage();
    },[])
    
    // postImage for api submit
    const [postImage, setPostImage] = useState()

    // crop image and setting postImage
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ aspect: 1 })

    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
       
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        canvas.toBlob(blob => {
            setPostImage(blob);
        }) 
        
    }

    // submit image
    const handlePostImage = () => {
        let form_data = new FormData()
        form_data.append('display_picture_path', postImage)
		// submit to api
		axios
			.post(`http://localhost:8000/api/v1/profiles/image?user_id=${props.user_id}`, form_data, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization:
                        "Bearer " + CookieService.get("access_token"),
                    'content-type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response);
                console.log(response.data);
                // calling getuserImage function everytime user saves image.
                // getuserImage();
			})
			.catch((error) => {
				console.log(error);
			});
    };
    
    // submit works when postImage changes
    useEffect(() => {
        // so that handlePostImage does not run at first render
        if (postImage){
            handlePostImage()
        }   
    }, [postImage])


    return (
         
        <div>
            <img
                className='user'
                src={userImage}
                alt=''
                data-toggle="modal"
                data-target="#userProfilePicModal"
			/>

            <div className="modal fade" id="userProfilePicModal" tabIndex="-1" role="dialog" aria-labelledby="userProfilePicModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="userProfilePicModalLabel">Edit Profile Picture</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                            <div className="modal-body">
                                <div className='row pb-2' >
                                    <input className='col-md-10' id='picture' type='file' name='picture' accept='image/*'
                                    required onInput={handleChange} />
                                    <button className="col-md-2 btn btn-primary btn-block" onClick={getCroppedImg} data-dismiss="modal">Save</button>
                                    <hr></hr>
                                </div>
                            </div>
                            
                            <div className="modal-footer justify-content-center">
                                <div className=''>
                                        <ReactCrop src={browseImg} crop={crop} onImageLoaded={setImage} onChange={setCrop} circularCrop />
                                </div>
                            </div>
    
                    </div>
                </div>
            </div>
        </div>
                 
    )
}

export default UserPicModal
