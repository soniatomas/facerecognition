import React from 'react';
import './FaceRecognition.css';

/*  
	Component to show the image and the face(s) detected in the image. 
	Detect face(s) are enclosed in a blue bounding box. 
	Used tachyons to format the image
*/
const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputtedImage' alt='' src={imageUrl} width='500px' height='auto'/>
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;