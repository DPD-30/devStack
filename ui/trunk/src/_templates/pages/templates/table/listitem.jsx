import React from 'react'

export default function (props) {
	return (	 
				<tr>
					<th scope="row">{props.UserNameID}</th>
					<td>{props.FirstName}</td>
					<td>{props.LastName}</td>
					<td>{props.UserName}</td>
				</tr>  
	)
}
