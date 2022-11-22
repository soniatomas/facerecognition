import React from 'react';

/*
Component to display the rank of the user 
Used tachyons to style the rank
*/
const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3'>
				{`${name}, your current entry count is ...`}
			</div>
			<div className='white f1'>
				{`${entries}`}
			</div>
		</div>
	);
}

export default Rank;