import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './icons8-brain-100.png';
import './Logo.css';

/*
Component for brain logo
Downloaded the brain logo from:
https://icons8.com/icons/set/brain
Used tachyons and tilt to create and style the logo */

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height:150, width:150}}>
				<div className="Tilt-inner pa3">
					<img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;