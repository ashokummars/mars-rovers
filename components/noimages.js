const NoImages = ( ) => (
	<div className="no-picture">
		<div>No pictures</div>
		<div>Example for successful search are:</div>
		<ul>
			<li>A simple Rover (Curiosity) based search with Martian Rol as 1,2,3 or 1000</li>
			<li>A simple Rover (Curiosity) based search with Camera (FHAC) with Martian Sol 1000</li>
			<li>A simple Rover (Oppurtunity) based search with Martian Sol 1000</li>
		</ul>
		<style jsx>{`
			div.no-picture{
				margin: 10px 0;
			}
		`}</style>
	</div>
)

export default NoImages;