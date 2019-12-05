import React from 'react';

export default function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<a className="navbar-brand" href="#">
				2k Market
			</a>
			<button
				className="navbar-toggler collapsed"
				type="button"
				data-toggle="collapse"
				data-target="#navbarColor01"
				aria-controls="navbarColor01"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div className="navbar-collapse collapse" id="navbarColor01">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<a className="nav-link" href="#">
							Home <span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							Suppliers
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							Items
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							Invoices
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
