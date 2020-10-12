import React from 'react'

export default function () {
	const head = ["First Name", "Last Name", "Username"]
	const body = []

	return (
		<div class="col-lg-6 mb-30">
		<div class="portlet-box">
			<div class="portlet-header flex-row flex d-flex align-items-center">
				<div class="flex d-flex flex-column">
					<h3>Table Example</h3>  
				</div>
			</div>
			<div class="portlet-body no-padding">
			   <table class="table table-sm mb-0">
				<thead>
					{head}
				</thead>
				<tbody>
					{body}
				</tbody>
			</table>
			</div>
		</div>
	</div>
	)
}
