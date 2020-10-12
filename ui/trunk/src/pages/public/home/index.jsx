import React from 'react'
import { Jumbotron } from 'reactstrap'


export default function home() {
	return (
		<Jumbotron style={{ width: '650px', margin: '0 auto', textAlign: 'center' }}>
			<h3>Welcome!</h3>
			<br />
			<p>This application was created as a demonstration of technical capabilities.</p>
			<hr />
			<p>It leverages a modern and extensive technical stack, including:</p>
			<ul style={{ width: '180px', textAlign: 'left', margin: '0 auto' }}>
				<li>ReactJS</li>
				<li>Reflux</li>
				<li>OpenAPI</li>
				<li>C# WebAPI</li>
				<li>MS SQL Server</li>
				<li>MS Azure</li>
			</ul>
		</Jumbotron>
	)
}
