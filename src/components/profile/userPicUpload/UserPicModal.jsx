import React, { useState } from 'react'
import './userpicmodal.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import axios from "axios";
import FetchService from "../../../services/FetchService";
import CookieService from "../../../services/CookieService";

function UserPicModal(props) {

    // fetch
    const [img1, setImg1] = useState('/img/profile/minion2.png')

    const getImg1 = () => {
		FetchService.fetch(
			`/profiles?user_id=${props.user_id}`,
			"GET",
			"application/json",
			true,
			null,
			(data) => {
				setImg1('http://localhost:8000/storage/'+ data[0].display_picture_path);
                console.log(data[0].display_picture_path);
                console.log(img1)
			}
		);
    };
    
    // submit

    const handleSubmit = (e) => {
        let form_data = new FormData()
        form_data.append('display_picture_path', postImage)
		e.preventDefault();
		e.persist();
		console.log('Hello ' + postImage);
		// submit to api
		axios
			.post("http://localhost:8000/api/v1/profiles/image", form_data, {
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
			})
			.catch((error) => {
				console.log(error);
			});
	};

    const [src, setSrc] = useState("/img/profile/defaultuser.png");
    const [postImage, setPostImage] = useState("/img/profile/defaultuser.png")

    const handleChange = e => {
        setSrc(URL.createObjectURL(e.target.files[0]))
        // setPostImage(e.target.files[0]) 
    }

    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ aspect: 1 })
    const [croppedImage, setCroppedImage] = useState("/img/profile/defaultuser.png")
    


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

        const base64Image = canvas.toDataURL('image/jpeg')
        setCroppedImage(base64Image)

        canvas.toBlob(blob => {
            setPostImage(blob)
        })
        
    }


    


    return (
         
        <div>
            <img
                className='user'
                src={croppedImage}
                alt=''
                data-toggle="modal"
                data-target="#userProfilePicModal"
			/>
            <img
                className=''
                src={img1}
                alt='Image here'
                data-toggle="modal"
                data-target="#userProfilePicModal"
			/>

            <div className="modal fade" id="userProfilePicModal" tabIndex="-1" role="dialog" aria-labelledby="userProfilePicModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userProfilePicModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        
                            <div className="modal-body">
                                <div className='col-md-6 pb-2' >
                                    <input id='picture' type='file' name='picture' accept='image/*'
                                    required onInput={handleChange} />
                                </div>
                                <div className='text-center'>
                                        <ReactCrop src={src} crop={crop} onImageLoaded={setImage} onChange={setCrop} circularCrop />
                                </div>
                                    <button className="btn btn-danger" onClick={getCroppedImg} >Crop Image</button>
                                    <button className="btn btn-danger" onClick={handleSubmit} >Submit</button>
                                    <button className="btn btn-danger" onClick={getImg1} >Get Profile Image</button>
                            </div>
                        
                    
                    </div>
                </div>
            </div>
        </div>
                 
    )
}

export default UserPicModal
