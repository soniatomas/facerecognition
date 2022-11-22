import React from 'react';

/* 
Component for navigation bar.
Navigation bar contains sign out link
Used tachyons to style the navigation header
*/
const Navigation = ({ onRouteChange, isSignedIn }) => {
		if (isSignedIn) {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				</nav>
			);
		} else {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
				<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
				</nav>
			);
		}
}

export default Navigation;